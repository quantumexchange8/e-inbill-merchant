<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Classification;
use App\Models\Merchant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MerchantController extends Controller
{
    public function merchant()
    {

        $user = Auth::user();
        
        $data = [
            'user' => $user,
            'merchant_details' => $user->merchant,
        ];

        return response()->json($data, 200);
    }

    public function classification()
    {

        $classification = Classification::get();

        $data = [
            'classification' => $classification,
        ];

        return response()->json($data, 200);
    }
    
}
