<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CalculateRequest;
use App\Models\CalculatorLog;
use App\Models\Commodity;
use App\Models\Product;
use App\Services\CalculatorService;
use Illuminate\Http\JsonResponse;

class CalculatorController extends Controller
{
    public function __invoke(
        CalculateRequest $request,
        CalculatorService $calculator,
    ): JsonResponse {
        $data = $request->validated();
        $locale = $data['locale'] ?? 'id';
        $result = $calculator->calculate($data, $locale);

        $productSlugs = collect($result['products'] ?? [])->pluck('slug')->all();

        CalculatorLog::create([
            'session_hash' => $this->hashSession($request->header('X-Session-Id')),
            'mode' => $data['mode'],
            'commodity_id' => Commodity::query()
                ->where('slug', $data['commodity_slug'])
                ->value('id'),
            'product_ids' => Product::query()
                ->whereIn('slug', $productSlugs)
                ->pluck('id')
                ->all(),
            'payload' => $data,
            'result' => $result,
            'locale' => $locale,
            'ip_hash' => hash_hmac(
                'sha256',
                (string) $request->ip(),
                (string) config('app.key'),
            ),
        ]);

        return response()->json(['data' => $result]);
    }

    private function hashSession(?string $session): ?string
    {
        return $session ? hash('sha256', $session) : null;
    }
}
