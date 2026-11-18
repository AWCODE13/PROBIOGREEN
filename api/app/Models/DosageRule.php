<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DosageRule extends Model
{
    public const BASES = [
        'per_ha',
        'per_plant',
        'per_animal_day',
        'per_m3_day',
        'per_kg_biomass_day',
    ];

    public const FREQUENCIES = ['once', 'weekly', 'biweekly', 'monthly'];

    protected $fillable = [
        'product_id',
        'commodity_id',
        'basis',
        'value_ml',
        'frequency',
        'duration_weeks',
        'note',
        'source',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'value_ml' => 'integer',
            'duration_weeks' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function commodity(): BelongsTo
    {
        return $this->belongsTo(Commodity::class);
    }
}
