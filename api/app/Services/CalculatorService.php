<?php

namespace App\Services;

use App\Models\Commodity;
use App\Models\DosageRule;
use App\Models\ProductVariant;
use Illuminate\Support\Collection;

class CalculatorService
{
    public const DISCLAIMER = 'Hasil perhitungan adalah estimasi berdasarkan dosis anjuran. Kondisi lahan, air, dan iklim dapat mengubah kebutuhan aktual.';

    public function calculate(array $input, string $locale = 'id'): array
    {
        $commodity = Commodity::query()
            ->where('slug', $input['commodity_slug'])
            ->where('is_active', true)
            ->with('translations')
            ->firstOrFail();

        $rule = DosageRule::query()
            ->where('commodity_id', $commodity->id)
            ->where('is_active', true)
            ->when(
                $input['product_slug'] ?? null,
                fn ($query, $slug) => $query->whereHas(
                    'product',
                    fn ($product) => $product
                        ->where('slug', $slug)
                        ->where('is_active', true),
                ),
            )
            ->with([
                'product.translations',
                'product.variants' => fn ($query) => $query
                    ->where('is_active', true)
                    ->orderByDesc('volume_ml'),
            ])
            ->orderBy('id')
            ->first();

        if (! $rule) {
            return [
                'available' => false,
                'message' => 'Dosis untuk komoditas ini belum tersedia.',
                'disclaimer' => self::DISCLAIMER,
            ];
        }

        $totalMl = $this->totalMl($rule, $input);
        $packages = $this->packages($rule->product->variants, $totalMl);
        $priceComplete = $packages !== [] && collect($packages)
            ->every(fn (array $package) => $package['subtotal_idr'] !== null);

        return [
            'available' => true,
            'total_ml' => $totalMl,
            'display' => $this->display($totalMl),
            'packages' => $packages,
            'estimated_cost_idr' => $priceComplete
                ? collect($packages)->sum('subtotal_idr')
                : null,
            'price_complete' => $priceComplete,
            'schedule' => $this->schedule($rule, $totalMl),
            'notes' => array_values(array_filter([$rule->note])),
            'products' => [[
                'slug' => $rule->product->slug,
                'name' => $rule->product->nameFor($locale),
            ]],
            'disclaimer' => self::DISCLAIMER,
        ];
    }

    private function totalMl(DosageRule $rule, array $input): int
    {
        $days = (int) ($input['days'] ?? 1);

        $ml = match ($rule->basis) {
            'per_ha' => ((float) ($input['area_m2'] ?? 0) / 10000) * $rule->value_ml,
            'per_plant' => (float) ($input['plants'] ?? 0) * $rule->value_ml,
            'per_animal_day' => (float) ($input['population'] ?? 0) * $rule->value_ml * $days,
            'per_m3_day' => (float) ($input['volume_m3'] ?? 0) * $rule->value_ml * $days,
            'per_kg_biomass_day' => (((float) ($input['population'] ?? 0) * (float) ($input['weight_g'] ?? 0)) / 1000) * $rule->value_ml * $days,
            default => 0.0,
        };

        return max(0, (int) (ceil($ml / 10) * 10));
    }

    /**
     * @param  Collection<int, ProductVariant>  $variants
     */
    private function packages(Collection $variants, int $totalMl): array
    {
        if ($variants->isEmpty() || $totalMl <= 0) {
            return [];
        }

        $remaining = $totalMl;
        $rows = [];

        foreach ($variants as $variant) {
            $quantity = intdiv($remaining, $variant->volume_ml);

            if ($quantity < 1) {
                continue;
            }

            $remaining -= $quantity * $variant->volume_ml;
            $rows[$variant->id] = $this->row($variant, $quantity);
        }

        if ($remaining > 0) {
            $smallest = $variants->last();
            $current = $rows[$smallest->id]['qty'] ?? 0;
            $rows[$smallest->id] = $this->row($smallest, $current + 1);
        }

        return array_values($rows);
    }

    private function row(ProductVariant $variant, int $quantity): array
    {
        return [
            'variant_id' => $variant->id,
            'label' => $variant->label,
            'qty' => $quantity,
            'subtotal_idr' => $variant->price_idr === null
                ? null
                : $variant->price_idr * $quantity,
        ];
    }

    private function schedule(DosageRule $rule, int $totalMl): array
    {
        $lastWeek = max(0, $rule->duration_weeks - 1);

        $weeks = match ($rule->frequency) {
            'weekly' => range(0, $lastWeek),
            'biweekly' => range(0, $lastWeek, 2),
            'monthly' => range(0, $lastWeek, 4),
            default => [0],
        };

        $count = count($weeks);
        $base = intdiv($totalMl, $count);
        $remainder = $totalMl % $count;

        return array_map(
            fn (int $week, int $index) => [
                'week' => $week,
                'dose_ml' => $base + ($index < $remainder ? 1 : 0),
            ],
            $weeks,
            array_keys($weeks),
        );
    }

    private function display(int $totalMl): string
    {
        if ($totalMl < 1000) {
            return $totalMl.' ml';
        }

        $liters = rtrim(
            rtrim(number_format($totalMl / 1000, 2, ',', '.'), '0'),
            ',',
        );

        return $liters.' L';
    }
}
