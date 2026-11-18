<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CalculatorLog extends Model
{
    protected $fillable = [
        'session_hash',
        'mode',
        'commodity_id',
        'product_ids',
        'payload',
        'result',
        'locale',
        'ip_hash',
    ];

    protected function casts(): array
    {
        return [
            'product_ids' => 'array',
            'payload' => 'array',
            'result' => 'array',
        ];
    }

    public function commodity(): BelongsTo
    {
        return $this->belongsTo(Commodity::class);
    }
}
