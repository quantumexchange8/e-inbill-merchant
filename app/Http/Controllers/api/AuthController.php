<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('role_id', 'password');

        // Validate the request data
        $validator = Validator::make($credentials, [
            'role_id' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'user' => null,
                'message' => 'Validation error',
                'status' => 'failed',
                'errors' => $validator->errors()
            ], 400);
        }

        // Find the merchant by role_id
        $merchant = User::where('role_id', $credentials['role_id'])->first();

        if (!$merchant || !Hash::check($credentials['password'], $merchant->password)) {
            
            return response()->json([
                'user' => null,
                'message' => 'Invalid login details',
                'status' => 'failed',
            ], 200);
        }

        // Create a token for the authenticated merchant
        $token = $merchant->createToken('API Token')->plainTextToken;

        $user_loggedin = [
            'id' => $merchant->id,
            'role_id' => $merchant->role_id,
            'status' => 'loggedin',
            'token' => $token,
        ];

        return response()->json($user_loggedin, 200);
    }
}
