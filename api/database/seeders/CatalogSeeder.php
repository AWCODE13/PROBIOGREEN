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
        // Commodities (tidak perlu banyak, hanya untuk dosis)
        $padi = $this->commodity('padi', 'pertanian', 'Padi', 1);
        $ayam = $this->commodity('ayam-broiler', 'peternakan', 'Ayam broiler', 2);
        $nila = $this->commodity('nila', 'perikanan', 'Nila', 3);

        // Products dengan harga
        $pertanian = $this->product(
            'probiogreen-pertanian',
            'pertanian',
            'Probiogreen Pertanian',
            1,
            'Pupuk hayati & pembenah tanah untuk meningkatkan produktivitas lahan pangan, hortikultura, dan pertanian berkelanjutan.',
            [500 => 35000, 1000 => 65000],
        );

        $perkebunan = $this->product(
            'probiogreen-perkebunan',
            'perkebunan',
            'Probiogreen Perkebunan',
            2,
            'Suplemen organik untuk perkebunan kakao, kelapa, karet, dan tanaman perkebunan lainnya dengan hasil optimal.',
            [500 => 35000, 1000 => 65000],
        );

        $peternakan = $this->product(
            'probiogreen-peternakan',
            'peternakan',
            'Probiogreen Peternakan',
            3,
            'Suplemen nafsu makan, pencernaan, dan kesehatan untuk ternak ayam, sapi, kambing, dan unggas lainnya.',
            [500 => 35000, 1000 => 65000],
        );

        $perikanan = $this->product(
            'probiogreen-perikanan',
            'perikanan',
            'Probiogreen Perikanan',
            4,
            'Suplemen kolam dan tambak untuk ikan nila, lele, udang, dan budidaya air lainnya dengan kualitas terjamin.',
            [500 => 35000, 1000 => 65000],
        );

        // Dosage rules
        DosageRule::updateOrCreate(
            [
                'product_id' => $pertanian->id,
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
                'product_id' => $peternakan->id,
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
                'product_id' => $perikanan->id,
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
        array $variants = [500 => null, 1000 => null],
    ): Product {
        $product = Product::updateOrCreate(
            ['slug' => $slug],
            [
                'category' => $category,
                'form' => 'liquid',
                'price_visible' => true,
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

        $sort = 1;
        foreach ($variants as $volume_ml => $price_idr) {
            $label = $volume_ml === 500 ? '500 ml' : ($volume_ml === 1000 ? '1 L' : "{$volume_ml} ml");
            ProductVariant::updateOrCreate(
                ['product_id' => $product->id, 'label' => $label],
                ['volume_ml' => $volume_ml, 'price_idr' => $price_idr, 'is_active' => true, 'sort' => $sort],
            );
            $sort++;
        }

        return $product;
    }
}
