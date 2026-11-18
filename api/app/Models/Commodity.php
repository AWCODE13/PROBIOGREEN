<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commodity extends Model
{
    protected $fillable = ['slug', 'category', 'is_active', 'sort'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public function translations(): HasMany
    {
        return $this->hasMany(CommodityTranslation::class);
    }

    public function dosageRules(): HasMany
    {
        return $this->hasMany(DosageRule::class);
    }

    public function nameFor(string $locale = 'id'): string
    {
        $translations = $this->relationLoaded('translations')
            ? $this->translations
            : $this->translations()->get();

        $translation = $translations->firstWhere('locale', $locale)
            ?? $translations->first();

        return $translation?->name ?? $this->slug;
    }
}
