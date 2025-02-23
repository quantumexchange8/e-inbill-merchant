<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddItemRequest;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\EditCategoryRequest;
use App\Models\Category;
use App\Models\Classification;
use App\Models\Item;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function itemListing()
    {

        $categories = Category::where('merchant_id', Auth::user()->merchant_id)->get();

        $items = Item::where('merchant_id', Auth::user()->merchant_id)->get();

        return Inertia::render('ItemListing/ItemListing', [
            'categories' => $categories,
            'items' => $items,
        ]);
    }

    public function newCategory(Request $request)
    {
        $user = Auth::user();

        $category = Category::create([
            'merchant_id' => $user->merchant_id,
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'success created!');
    }

    public function editCategory(EditCategoryRequest $request)
    {

        $category = Category::find($request->id);

        $category->update([
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'success updated!');
    }

    public function deleteCategory(Request $request)
    {

        $delete = Category::find($request->id);
        $delete->delete();

        return redirect()->back()->with('success', 'success updated!');
    }

    public function getItem(Request $request)
    {

        $item = Item::query()->with(['category', 'classification'])->where('merchant_id', Auth::user()->merchant_id);

        $datas = $item->get();

        $datas->each(function ($imgs) {
            $imgs->itemImgs = $imgs->getFirstMediaUrl('item_image');
        });
        
        return response()->json($datas);
    }

    public function newItem(AddItemRequest $request)
    {

        $item = Item::create([
            'merchant_id' => Auth::user()->merchant_id,
            'name' => $request->name,
            'price' => $request->price,
            'classification_id' => $request->classification_id['id'],
            'sku' => RunningNumberService::getID('sku'),
            'category_id' => $request->category['id'],
            'cost' => $request->cost,
            'stock' => $request->stock,
            'barcode' => $request->barcode,
            'status' => 'active',
        ]);

        if ($request->hasfile('item_image'))
        {
            $item->addMedia($request->item_image)->toMediaCollection('item_image');
        } else {
            $item->update([
                'image_color' => $request->color,
                'image_shape' => $request->shape,
            ]);
        }

        return redirect()->back()->with('success', 'success created!');
    }

    public function updateStatus(Request $request)
    {
        $item = Item::find($request->id);
        
        if ($item->status === "active") {
            $item->update([
                'status' => 'inactive',
            ]);
        } else {
            $item->update([
                'status' => 'active',
            ]);
        }
        

        return redirect()->back()->with('success', 'success created!');
    }

    public function editItem(Request $request)
    {
        $item = Item::find($request->id);
        $item->update([
            'merchant_id' => Auth::user()->merchant_id,
            'name' => $request->name,
            'price' => $request->price,
            'classification_id' => $request->classification_id,
            'sku' => $request->sku,
            'category_id' => $request->category,
            'cost' => $request->cost,
            'stock' => $request->stock,
            'barcode' => $request->barcode,
            'status' => 'active',
        ]);

        if ($request->hasfile('item_image'))
        {
            $item->clearMediaCollection('item_image');
            $item->addMedia($request->item_image)->toMediaCollection('item_image');
        } else {
            $item->update([
                'image_color' => $request->color,
                'image_shape' => $request->shape,
            ]);
        }

        return redirect()->back()->with('success', 'success created!');
    }

    public function deleteItem(Request $request)
    {
        $item = Item::find($request->id);

        $item->delete();

        return redirect()->back()->with('success', 'success created!');
    }

    public function getClassification(Request $request)
    {
        $classification = Classification::query();

        $datas = $classification->get();

        return response()->json($datas);

    }
}
