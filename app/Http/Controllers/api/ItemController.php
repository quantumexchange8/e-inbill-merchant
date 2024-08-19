<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Item;
use App\Models\ItemImage;
use App\Models\Merchant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ItemController extends Controller
{
    public function getCategory()
    {
        $user = Auth::user();

        $category = Category::where('merchant_id', $user->merchant_id)->get();

        if (!empty($category)) {
            $data = [
                'category' => $category,
                'status' => 'success',
            ];

            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 'no data created',
            ];

            return response()->json($data, 200);
        }
    }

    public function addCategory(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories|max:255',
            'color' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors() // Return validation errors
            ], 422); // 422 Unprocessable Entity status code
        } else {
            $category = Category::create([
                'merchant_id' => $user->merchant_id,
                'name' => $request->name,
                'color' => $request->color,
            ]);
    
            return response()->json([
                'status' => 'succesfull created category',
            ], 200);
            
        }
        
    }

    public function editCategory(Request $request)
    {
        $user = Auth::user();
        $category = Category::find($request->id);

        $validator = Validator::make($request->all(), [
            'name' => [
            'required',
            'string',
            'max:255',
            Rule::unique('categories')->ignore($category->id), // Ignore current category ID
        ],
            'color' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors() // Return validation errors
            ], 422); // 422 Unprocessable Entity status code
        } else {
            $category->update([
                'name' => $request->name,
                'color' => $request->color,
            ]);

            return response()->json([
                'status' => 'succesfull updated category',
            ], 200);
        }
    }

    public function deleteCategory(Request $request) 
    {
        $user = Auth::user();
        $category = Category::find($request->id);

        $category->delete();

        return response()->json([
            'status' => 'succesfull deleted category',
        ], 200);
    }

    public function getItem()
    {
        $user = Auth::user();

        $item = Item::where('merchant_id', $user->merchant_id)->get();

        if (!empty($item)) {
            $data = [
                'item' => $item,
                'status' => 'success',
            ];

            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 'no data created',
            ];

            return response()->json($data, 200);
        }
    }

    public function getItemImages()
    {
        $item = ItemImage::get();

        return response()->json($item, 200);
    }

    public function addItem(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => [
            'required',
            Rule::unique('items'), // Ignore current category ID
        ],
            'price' => 'required',
            'classification_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors() // Return validation errors
            ], 422); // 422 Unprocessable Entity status code
        } else {
            
            $item = Item::create([
                'merchant_id' => $user->merchant_id,
                'name' => $request->name,
                'price' => $request->price,
                'classification_id' => $request->classification_id['id'],
                'sku' => $request->sku,
                'category_id' => $request->category['id'],
                'cost' => $request->cost,
                'stock' => $request->stock,
                'barcode' => $request->barcode,
                'status' => 'active',
                'image_code' => $request->image_code ?? null,
            ]);

            if ($request->hasFile('item_image')) {
                $item->addMedia($request->item_image)->toMediaCollection('item_image');
            }

            return response()->json([
                'status' => 'succesfull created new item',
            ], 200);
        }
    }

    public function editItem(Request $request)
    {

        $item = Item::find($request->item_id);

        $validator = Validator::make($request->all(), [
            'name' => [
            'required',
            Rule::unique('items')->ignore($item->id), // Ignore current category ID
        ],
            'price' => 'required',
            'classification_id' => 'required',
        ]);

        $item->update([
            'name' => $request->name,
            'price' => $request->price,
            'classification_id' => $request->classification_id,
            'sku' => $request->sku,
            'category_id' => $request->category,
            'cost' => $request->cost,
            'stock' => $request->stock,
            'barcode' => $request->barcode,
            'status' => 'active',
            'image_code' => $request->image_code ?? null,
        ]);

        return response()->json([
            'status' => 'succesfull updated item',
        ], 200);
    }

    public function deleteItem(Request $request)
    {

        $item = Item::find($request->item_id);

        $item->delete();

        return response()->json([
            'status' => 'succesfull deleted item',
        ], 200);
    }
}