<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Requests\EditCategoryRequest;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
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

        $item = Item::query();

        $datas = $item->get();

        return response()->json($datas);
    }

    public function newItem(Request $request)
    {
        dd($request->all());


        return redirect()->back()->with('success', 'success created!');
    }
}
