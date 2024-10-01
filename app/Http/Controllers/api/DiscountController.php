<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DiscountController extends Controller
{

    public function getDiscount()
    {



        return response()->json([
            'status' => 'succesfull created transaction',
        ], 200);
    }

    public function addDiscount(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'max:255',
                Rule::unique('discounts')->whereNull('deleted_at'), // Ensure uniqueness only for non-deleted rows
            ],
            'value',
            'type'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        } else {

            $discount = Discount::create([
                'merchant_id' => $user->merchant_id,
                'name' => $request->name,
                'type' => $request->type,
                'rate' => $request->value,
                'status' => 'active',
            ]);
    
            return response()->json([
                'status' => 'succesfull created discount',
            ], 200);
            
        }
    }

    public function deleteDiscount()
    {
        
        return response()->json([
            'status' => 'succesfull created transaction',
        ], 200);
    }
}
