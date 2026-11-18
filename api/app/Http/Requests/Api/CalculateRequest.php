<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CalculateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $mode = $this->input('mode');

        return [
            'mode' => ['required', Rule::in(['plant', 'livestock', 'fishery'])],
            'commodity_slug' => ['required', 'string', 'exists:commodities,slug'],
            'product_slug' => ['nullable', 'string', 'exists:products,slug'],
            'area_m2' => [
                'nullable',
                'numeric',
                'min:1',
                'max:100000',
                Rule::requiredIf($mode === 'plant'),
            ],
            'plants' => ['nullable', 'integer', 'min:1', 'max:1000000'],
            'population' => [
                'nullable',
                'integer',
                'min:1',
                'max:1000000',
                Rule::requiredIf($mode === 'livestock'),
            ],
            'volume_m3' => [
                'nullable',
                'numeric',
                'min:1',
                'max:100000',
                Rule::requiredIf($mode === 'fishery'),
            ],
            'weight_g' => ['nullable', 'numeric', 'min:1', 'max:10000'],
            'days' => [
                'nullable',
                'integer',
                'min:1',
                'max:365',
                Rule::requiredIf(in_array($mode, ['livestock', 'fishery'], true)),
            ],
            'locale' => ['nullable', 'string', Rule::in(['id', 'en'])],
        ];
    }

    public function messages(): array
    {
        return [
            'mode.required' => 'Pilih jenis perhitungan terlebih dahulu.',
            'mode.in' => 'Jenis perhitungan tidak dikenal.',
            'commodity_slug.required' => 'Pilih komoditas terlebih dahulu.',
            'commodity_slug.exists' => 'Komoditas tidak ditemukan.',
            'area_m2.required' => 'Luas lahan wajib diisi.',
            'area_m2.min' => 'Luas lahan minimal 1 m².',
            'area_m2.max' => 'Luas lahan maksimal 100.000 m².',
            'population.required' => 'Jumlah populasi wajib diisi.',
            'population.min' => 'Populasi minimal 1 ekor.',
            'volume_m3.required' => 'Volume kolam wajib diisi.',
            'days.required' => 'Lama siklus wajib diisi.',
            'days.min' => 'Lama siklus minimal 1 hari.',
            'days.max' => 'Lama siklus maksimal 365 hari.',
        ];
    }
}
