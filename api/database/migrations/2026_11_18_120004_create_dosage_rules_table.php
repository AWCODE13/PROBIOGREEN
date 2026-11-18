<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dosage_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('commodity_id')->constrained()->cascadeOnDelete();
            $table->enum('basis', [
                'per_ha',
                'per_plant',
                'per_animal_day',
                'per_m3_day',
                'per_kg_biomass_day',
            ]);
            $table->unsignedInteger('value_ml');
            $table->string('frequency', 16)->default('once');
            $table->unsignedTinyInteger('duration_weeks')->default(1);
            $table->text('note')->nullable();
            $table->string('source')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['product_id', 'commodity_id', 'basis']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dosage_rules');
    }
};
