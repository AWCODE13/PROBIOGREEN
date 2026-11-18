<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()
            ->with(['translations', 'variants'])
            ->orderBy('sort')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->nameFor('id'),
                'category' => $product->category,
                'is_popular' => $product->is_popular,
                'image_url' => $this->imageUrl($product->image_path),
                'variants' => $product->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'label' => $v->label,
                    'price_idr' => $v->price_idr,
                ])->values(),
            ]);

        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    public function edit(Product $product)
    {
        $product->load(['translations', 'variants']);

        return Inertia::render('admin/products/edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->nameFor('id'),
                'description' => $product->descriptionFor('id') ?? '',
                'category' => $product->category,
                'is_popular' => $product->is_popular,
                'image_url' => $this->imageUrl($product->image_path),
                'variants' => $product->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'label' => $v->label,
                    'price_idr' => $v->price_idr,
                ])->values(),
            ],
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:2000'],
            'is_popular' => ['boolean'],
            'image' => ['nullable', 'image', 'max:4096'],
            'variants' => ['required', 'array'],
            'variants.*.id' => ['required', 'integer', 'exists:product_variants,id'],
            'variants.*.price_idr' => ['nullable', 'integer', 'min:0'],
        ]);

        $product->translations()->updateOrCreate(
            ['locale' => 'id'],
            ['name' => $data['name'], 'description' => $data['description'] ?? null],
        );

        $product->update(['is_popular' => $request->boolean('is_popular')]);

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }

            $product->update([
                'image_path' => $request->file('image')->store('products', 'public'),
            ]);
        }

        foreach ($data['variants'] as $variant) {
            $product->variants()->whereKey($variant['id'])->update([
                'price_idr' => $variant['price_idr'] ?? null,
            ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk diperbarui.');
    }

    private function imageUrl(?string $path): ?string
    {
        return $path ? url(Storage::disk('public')->url($path)) : null;
    }
}
