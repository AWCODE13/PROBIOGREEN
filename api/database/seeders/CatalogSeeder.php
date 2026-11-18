<?php

namespace Database\Seeders;

use App\Models\Commodity;
use App\Models\DosageRule;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $padi = $this->commodity('padi', 'pertanian', 'Padi', 1);
        $jagung = $this->commodity('jagung', 'pertanian', 'Jagung', 2);
        $ayam = $this->commodity('ayam-broiler', 'peternakan', 'Ayam broiler', 3);
        $nila = $this->commodity('nila', 'perikanan', 'Nila', 4);

        // Pertanian
        $tanaman = $this->product(
            'probiogreen-tanaman',
            'pertanian',
            'Probiogreen Tanaman',
            1,
            'Pupuk hayati & pembenah tanah untuk padi, jagung, sayuran.',
        );

        // Perkebunan
        $perkebunan = $this->product(
            'probiogreen-perkebunan',
            'perkebunan',
            'Probiogreen Perkebunan',
            2,
            'Suplemen organik untuk perkebunan kakao, kelapa, karet.',
        );

        // Peternakan
        $ternak = $this->product(
            'probiogreen-ternak',
            'peternakan',
            'Probiogreen Ternak',
            3,
            'Suplemen nafsu makan & pencernaan untuk ayam, sapi, kambing.',
        );

        // Perikanan
        $ikan = $this->product(
            'probiogreen-ikan',
            'perikanan',
            'Probiogreen Ikan',
            4,
            'Suplemen kolam & tambak untuk nila, lele, udang.',
        );

        DosageRule::updateOrCreate(
            [
                'product_id' => $tanaman->id,
                'commodity_id' => $padi->id,
                'basis' => 'per_ha',
            ],
            [
                'value_ml' => 2000,
                'frequency' => 'biweekly',
                'duration_weeks' => 4,
                'note' => 'Encerkan sesuai anjuran pada kemasan sebelum aplikasi.',
                'source' => 'PLACEHOLDER',
                'is_active' => true,
            ],
        );

        DosageRule::updateOrCreate(
            [
                'product_id' => $ternak->id,
                'commodity_id' => $ayam->id,
                'basis' => 'per_animal_day',
            ],
            [
                'value_ml' => 1,
                'frequency' => 'weekly',
                'duration_weeks' => 4,
                'note' => 'Dosis harian dicampur ke air minum.',
                'source' => 'PLACEHOLDER',
                'is_active' => true,
            ],
        );

        DosageRule::updateOrCreate(
            [
                'product_id' => $ikan->id,
                'commodity_id' => $nila->id,
                'basis' => 'per_m3_day',
            ],
            [
                'value_ml' => 2,
                'frequency' => 'weekly',
                'duration_weeks' => 8,
                'note' => 'Dosis harian ditebar merata ke kolam.',
                'source' => 'PLACEHOLDER',
                'is_active' => true,
            ],
        );

        $jagung->update(['is_active' => true]);
    }

    private function commodity(
        string $slug,
        string $category,
        string $name,
        int $sort,
    ): Commodity {
        $commodity = Commodity::updateOrCreate(
            ['slug' => $slug],
            ['category' => $category, 'is_active' => true, 'sort' => $sort],
        );

        $commodity->translations()->updateOrCreate(
            ['locale' => 'id'],
            ['name' => $name],
        );

        return $commodity;
    }

    private function product(
        string $slug,
        string $category,
        string $name,
        int $sort,
        string $description = 'Data produk masih berupa contoh sampai spesifikasi resmi tersedia.',
    ): Product {
        $product = Product::updateOrCreate(
            ['slug' => $slug],
            [
                'category' => $category,
                'form' => 'liquid',
                'price_visible' => false,
                'is_active' => true,
                'sort' => $sort,
            ],
        );

        $product->translations()->updateOrCreate(
            ['locale' => 'id'],
            [
                'name' => $name,
                'description' => $description,
            ],
        );

        ProductVariant::updateOrCreate(
            ['product_id' => $product->id, 'label' => '500 ml'],
            ['volume_ml' => 500, 'price_idr' => null, 'is_active' => true, 'sort' => 1],
        );

        ProductVariant::updateOrCreate(
            ['product_id' => $product->id, 'label' => '1 L'],
            ['volume_ml' => 1000, 'price_idr' => null, 'is_active' => true, 'sort' => 2],
        );

        return $product;
    }
}
