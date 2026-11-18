<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');
        $popular = $request->boolean('popular');

        $query = Product::query()
            ->where('is_active', true)
            ->with(['translations', 'variants'])
            ->orderBy('sort');

        if ($category) {
            $query->where('category', $category);
        }

        if ($popular) {
            $query->where('is_popular', true);
        }

        $products = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'slug' => $product->slug,
                'category' => $product->category,
                'name' => $product->nameFor('id'),
                'description' => $product->descriptionFor('id'),
                'form' => $product->form,
                'price_visible' => $product->price_visible,
                'image_path' => $product->image_path,
                'image_url' => $product->image_path
                    ? url(Storage::disk('public')->url($product->image_path))
                    : null,
                'is_popular' => (bool) $product->is_popular,
                'variants' => $product->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'label' => $v->label,
                    'volume_ml' => $v->volume_ml,
                    'price_idr' => $v->price_idr,
                ])->toArray(),
            ];
        });

        return response()->json([
            'data' => $products,
            'categories' => ['pertanian', 'peternakan', 'perikanan', 'perkebunan'],
        ]);
    }
}
