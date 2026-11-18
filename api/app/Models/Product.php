<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'slug',
        'category',
        'form',
        'price_visible',
        'is_active',
        'sort',
        'image_path',
        'is_popular',
    ];

    protected function casts(): array
    {
        return [
            'price_visible' => 'boolean',
            'is_active' => 'boolean',
            'is_popular' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public function translations(): HasMany
    {
        return $this->hasMany(ProductTranslation::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
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

    public function descriptionFor(string $locale = 'id'): ?string
    {
        $translations = $this->relationLoaded('translations')
            ? $this->translations
            : $this->translations()->get();

        $translation = $translations->firstWhere('locale', $locale)
            ?? $translations->first();

        return $translation?->description;
    }
}
