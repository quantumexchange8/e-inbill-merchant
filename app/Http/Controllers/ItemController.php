<?php

namespace App\Http\Controllers;

use App\Models\Category;
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

    public function newCategory(Request $request)
    {

        $category = Category::create([
            'merchant_id' => '1',
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'success created!');
    }
}
