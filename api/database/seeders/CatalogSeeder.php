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
        $padi = $this->commodity('padi', 'agriculture', 'Padi', 1);
        $jagung = $this->commodity('jagung', 'agriculture', 'Jagung', 2);
        $ayam = $this->commodity('ayam-broiler', 'livestock', 'Ayam broiler', 3);
        $nila = $this->commodity('nila', 'fishery', 'Nila', 4);

        $tanaman = $this->product(
            'probiogreen-tanaman',
            'agriculture',
            'Probiogreen Tanaman',
            1,
        );
        $ternak = $this->product(
            'probiogreen-ternak',
            'livestock',
            'Probiogreen Ternak',
            2,
        );
        $ikan = $this->product(
            'probiogreen-ikan',
            'fishery',
            'Probiogreen Ikan',
            3,
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
                'description' => 'Data produk masih berupa contoh sampai spesifikasi resmi tersedia.',
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
