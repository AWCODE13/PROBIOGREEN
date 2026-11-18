<?php

namespace App\Http\Controllers;

use App\Models\Commodity;
use App\Models\Product;
use App\Models\CalculatorLog;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $totalCommodities = Commodity::where('is_active', true)->count();
        $totalProducts = Product::where('is_active', true)->count();
        $totalCalculations = CalculatorLog::count();
        $recentLogs = CalculatorLog::query()
            ->whereNotNull('commodity_id')
            ->with(['commodity:id,slug'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($log) => [
                'id' => $log->id,
                'mode' => $log->mode,
                'commodity' => $log->commodity?->slug ?? '—',
                'total_ml' => $log->result['total_ml'] ?? null,
                'created_at' => $log->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('dashboard', [
            'stats' => [
                ['label' => 'Komoditas Aktif', 'value' => $totalCommodities],
                ['label' => 'Produk Aktif', 'value' => $totalProducts],
                ['label' => 'Total Kalkulasi', 'value' => $totalCalculations],
            ],
            'recentLogs' => $recentLogs,
        ]);
    }
}
