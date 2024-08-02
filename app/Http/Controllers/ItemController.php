<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddItemRequest;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\EditCategoryRequest;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function itemListing()
    {

        $categories = Category::get();

        return Inertia::render('ItemListing/ItemListing', [
            'categories' => $categories,
        ]);
    }

    public function newCategory(CategoryRequest $request)
    {

        $category = Category::create([
            'merchant_id' => '1',
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'success created!');
    }

    public function editCategory(EditCategoryRequest $request)
    {

        dd($request->all());

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

        $item = Item::query()->with(['category']);

        $datas = $item->get();

        return response()->json($datas);
    }

    public function newItem(AddItemRequest $request)
    {
        $item = Item::create([
            'merchant_id' => Auth::user()->id,
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


        return redirect()->back()->with('success', 'success created!');
    }

    public function updateStatus(Request $request)
    {
        $item = Item::find($request->id);

        $item->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'success created!');
    }
}
