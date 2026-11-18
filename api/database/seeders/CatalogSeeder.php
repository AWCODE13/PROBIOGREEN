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
        $jagung = $this->commodity('jagung', 'pertanian', 'Jagung', 4);

        // Products dengan harga
        $pertanian = $this->product(
            'probiogreen-pertanian',
            'pertanian',
            'Probiogreen Pertanian',
            1,
            'Pupuk hayati & pembenah tanah untuk meningkatkan produktivitas lahan pangan, hortikultura, dan pertanian berkelanjutan.',
            [500 => 35000, 1000 => 65000],
            true,
        );

        $perkebunan = $this->product(
            'probiogreen-perkebunan',
            'perkebunan',
            'Probiogreen Perkebunan',
            2,
            'Suplemen organik untuk perkebunan kakao, kelapa, karet, dan tanaman perkebunan lainnya dengan hasil optimal.',
            [500 => 35000, 1000 => 65000],
            false,
        );

        $peternakan = $this->product(
            'probiogreen-peternakan',
            'peternakan',
            'Probiogreen Peternakan',
            3,
            'Suplemen nafsu makan, pencernaan, dan kesehatan untuk ternak ayam, sapi, kambing, dan unggas lainnya.',
            [500 => 35000, 1000 => 65000],
            true,
        );

        $perikanan = $this->product(
            'probiogreen-perikanan',
            'perikanan',
            'Probiogreen Perikanan',
            4,
            'Suplemen kolam dan tambak untuk ikan nila, lele, udang, dan budidaya air lainnya dengan kualitas terjamin.',
            [500 => 35000, 1000 => 65000],
            true,
        );

        // Dosis estimasi: rata-rata pupuk organik cair (POC) yang umum dipakai.
        // Bukan dosis resmi produk; sesuaikan dengan label kemasan.
        $rules = [
            [$pertanian, $padi, 'per_ha', 3000, 'biweekly', 8, 'Aplikasi 3 L/ha tiap 2 minggu, 4 kali per siklus.'],
            [$pertanian, $jagung, 'per_ha', 3000, 'biweekly', 8, 'Aplikasi 3 L/ha tiap 2 minggu, 4 kali per siklus.'],
            [$peternakan, $ayam, 'per_animal_day', 1, 'daily', 4, 'Sekitar 1 ml/ekor/hari dicampur air minum.'],
            [$perikanan, $nila, 'per_m3_day', 2, 'daily', 4, 'Sekitar 2 ml/m3/hari ditebar merata ke kolam.'],
        ];

        foreach ($rules as [$product, $commodity, $basis, $value, $frequency, $weeks, $note]) {
            DosageRule::updateOrCreate(
                [
                    'product_id' => $product->id,
                    'commodity_id' => $commodity->id,
                    'basis' => $basis,
                ],
                [
                    'value_ml' => $value,
                    'frequency' => $frequency,
                    'duration_weeks' => $weeks,
                    'note' => $note,
                    'source' => 'ESTIMASI',
                    'is_active' => true,
                ],
            );
        }
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
        bool $isPopular = false,
        ?string $imagePath = null,
    ): Product {
        $product = Product::updateOrCreate(
            ['slug' => $slug],
            [
                'category' => $category,
                'form' => 'liquid',
                'price_visible' => true,
                'is_active' => true,
                'sort' => $sort,
                'is_popular' => $isPopular,
                'image_path' => $imagePath,
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
