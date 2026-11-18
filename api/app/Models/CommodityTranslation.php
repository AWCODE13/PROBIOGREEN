<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommodityTranslation extends Model
{
    public $timestamps = false;

    protected $fillable = ['commodity_id', 'locale', 'name', 'description'];

    public function commodity(): BelongsTo
    {
        return $this->belongsTo(Commodity::class);
    }
}
