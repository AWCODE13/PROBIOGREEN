<?php

namespace Tests\Feature\Api;

use App\Models\CalculatorLog;
use App\Models\Commodity;
use Database\Seeders\CatalogSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalculatorTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(CatalogSeeder::class);
    }

    public function test_plant_mode_returns_volume_packages_and_schedule(): void
    {
        $response = $this->postJson('/api/v1/calculator/calculate', [
            'mode' => 'plant',
            'commodity_slug' => 'padi',
            'area_m2' => 5000,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.available', true)
            ->assertJsonPath('data.total_ml', 6000)
            ->assertJsonPath('data.display', '6 L')
            ->assertJsonPath('data.packages.0.label', '1 L')
            ->assertJsonPath('data.packages.0.qty', 6)
            ->assertJsonPath('data.price_complete', true)
            ->assertJsonPath('data.estimated_cost_idr', 390000)
            ->assertJsonCount(4, 'data.schedule');
    }

    public function test_livestock_mode_multiplies_population_and_days(): void
    {
        $response = $this->postJson('/api/v1/calculator/calculate', [
            'mode' => 'livestock',
            'commodity_slug' => 'ayam-broiler',
            'population' => 1000,
            'days' => 30,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.total_ml', 30000)
            ->assertJsonPath('data.packages.0.label', '1 L')
            ->assertJsonPath('data.packages.0.qty', 30);
    }

    public function test_fishery_mode_uses_pool_volume_and_days(): void
    {
        $response = $this->postJson('/api/v1/calculator/calculate', [
            'mode' => 'fishery',
            'commodity_slug' => 'nila',
            'volume_m3' => 150,
            'days' => 30,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.total_ml', 9000);
    }

    public function test_commodity_without_dosage_rule_is_reported_as_unavailable(): void
    {
        Commodity::create([
            'slug' => 'kambing',
            'category' => 'peternakan',
            'is_active' => true,
            'sort' => 99,
        ]);

        $response = $this->postJson('/api/v1/calculator/calculate', [
            'mode' => 'plant',
            'commodity_slug' => 'kambing',
            'area_m2' => 1000,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.available', false);
    }

    public function test_area_below_minimum_is_rejected(): void
    {
        $response = $this->postJson('/api/v1/calculator/calculate', [
            'mode' => 'plant',
            'commodity_slug' => 'padi',
            'area_m2' => 0,
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors('area_m2');
    }

    public function test_calculation_is_logged_without_personal_data(): void
    {
        $this->postJson(
            '/api/v1/calculator/calculate',
            [
                'mode' => 'plant',
                'commodity_slug' => 'padi',
                'area_m2' => 5000,
            ],
            ['X-Session-Id' => 'session-abc-123'],
        )->assertOk();

        $this->assertDatabaseCount('calculator_logs', 1);

        $log = CalculatorLog::query()->first();

        $this->assertSame(hash('sha256', 'session-abc-123'), $log->session_hash);
        $this->assertNotSame('session-abc-123', $log->session_hash);
        $this->assertNull($log->payload['email'] ?? null);
    }
}
