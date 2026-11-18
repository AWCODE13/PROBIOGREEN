<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'label',
        'volume_ml',
        'price_idr',
        'sku',
        'is_active',
        'sort',
    ];

    protected function casts(): array
    {
        return [
            'volume_ml' => 'integer',
            'price_idr' => 'integer',
            'is_active' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
