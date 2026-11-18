<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
