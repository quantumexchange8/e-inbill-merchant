<?php

namespace App\Http\Requests;

use App\Models\Item;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', Rule::unique(Item::class)],
            'price' => ['required'],
            'sku' => ['required', Rule::unique(Item::class)],
            'barcode' => [Rule::unique(Item::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Name',
            'price' => 'Price',
            'classification_id' => 'Classification ID',
            'sku' => 'sku',
            'barcode' => 'barcode',
        ];
    }
}
