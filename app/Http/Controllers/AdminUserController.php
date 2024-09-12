<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function admin()
    {
        return Inertia::render('Admin/AdminUser');
    }

    public function addSubAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'title' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'title' => $request->title,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'subadmin',
            'merchant_id' => Auth::user()->merchant_id,
        ]);

        if($request->hasFile('profile_image')) {
            $user->addMedia($request->profile_image)->toMediaCollection('profile_image');
        }

        $user->assignRole('subadmin');

        if ($request->dashboard === 'enabled') {
            $user->givePermissionTo('dashboard');
        }
    
        if ($request->item === 'enabled') {
            $user->givePermissionTo('itemListing');
        }

        if ($request->sales === 'enabled') {
            $user->givePermissionTo('salesReport');
        }

        if ($request->admin === 'enabled') {
            $user->givePermissionTo('AdminUser');
        }

        if ($request->einvoice === 'enabled') {
            $user->givePermissionTo('einvoice');
        }

        if ($request->billing === 'enabled') {
            $user->givePermissionTo('myBilling');
        }

        if ($request->config === 'enabled') {
            $user->givePermissionTo('configuration');
        }

        return redirect()->back();
    }

    public function getSubAdmin()
    {

        $subadmin = User::where('role', 'subadmin')
                ->where('merchant_id', Auth::user()->merchant_id)
                ->with('merchant')
                ->get();

        return response()->json($subadmin);
    }
}
