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

        $user = Auth::user();

        $discount = Discount::where('merchant_id', $user->merchant_id)->get();

        return response()->json([
            'discount' => $discount,
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

    public function editDiscount(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'max:255',
                Rule::unique('discounts')->ignore($request->id),
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

            $discount = Discount::find($request->id);

            $discount->update([
                'name' => $request->name,
                'type' => $request->type,
                'rate' => $request->value,
                'status' => 'active',
            ]);
    
            return response()->json([
                'status' => 'succesfull updated discount',
            ], 200);
            
        }

    }

    public function deleteDiscount(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'merchant_id' => [
                'required',
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        } else {

            $discount = Discount::find($request->id);

            $discount->delete();
    
            return response()->json([
                'status' => 'succesfull deleted discount',
            ], 200);
            
        }
    }
}
