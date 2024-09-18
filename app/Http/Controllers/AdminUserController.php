<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

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
        
        $subadmins = User::where('role', 'subadmin')
                ->where('merchant_id', Auth::user()->merchant_id)
                ->with(['merchant', 'permissions']) // Eager load the permissions relationship
                ->get();

        $subadmins->each(function ($subadmin) {
            $subadmin->profile_image = $subadmin->getFirstMediaUrl('profile_image');
            
            // Format permissions to show which are enabled
            $subadmin->permissions = $subadmin->permissions->pluck('name'); // Get a list of enabled permission names
    
            // Example: If you want to include all permissions with their enabled status:
            $allPermissions = Permission::pluck('name'); // Get all available permissions
            $subadmin->permissions_status = $allPermissions->mapWithKeys(function ($permission) use ($subadmin) {
                return [$permission => $subadmin->permissions->contains($permission)]; // True if enabled, false if not
            });
        });

        return response()->json($subadmins);
    }

    public function editAdmin(Request $request)
    {


        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email', Rule::unique(User::class)->ignore($request->id),
            'title' => 'required',
        ]);

        $subadmin = User::find($request->id);

        $subadmin->update([
            'name' => $request->name,
            'title' => $request->title,
            'email' => $request->email,
        ]);

        if ($request->password) {
            $subadmin->password = Hash::make($request->password);
            $subadmin->save();
        }

        if($request->hasFile('profile_image')) {
            $subadmin->clearMediaCollection('profile_image');
            $subadmin->addMedia($request->profile_image)->toMediaCollection('profile_image');
        }


        return redirect()->back();
    }

    public function deleteAdmin(Request $request)
    {

        $deleteAdmin = User::find($request->id);

        $deleteAdmin->delete();

        return redirect()->back();
    }


    public function accessControl(Request $request)
    {

        $subadmin = User::find($request->id);

        if ($request->has('dashboard')) {
            // Assign or remove the permission based on the checked value
            if ($request->dashboard) {
                // Grant 'dashboard' permission if not already granted
                if (!$subadmin->hasPermissionTo('dashboard')) {
                    $subadmin->givePermissionTo('dashboard');
                }
            } else {
                // Revoke 'dashboard' permission if granted
                if ($subadmin->hasPermissionTo('dashboard')) {
                    $subadmin->revokePermissionTo('dashboard');
                }
            }
        }

        if ($request->has('item')) {
            if ($request->item) {
                if (!$subadmin->hasPermissionTo('itemListing')) {
                    $subadmin->givePermissionTo('itemListing');
                }
            } else {
                if ($subadmin->hasPermissionTo('itemListing')) {
                    $subadmin->revokePermissionTo('itemListing');
                }
            }
        }

        if ($request->has('sales')) {
            if ($request->sales) {
                if (!$subadmin->hasPermissionTo('salesReport')) {
                    $subadmin->givePermissionTo('salesReport');
                }
            } else {
                if ($subadmin->hasPermissionTo('salesReport')) {
                    $subadmin->revokePermissionTo('salesReport');
                }
            }
        }

        if ($request->has('invoice')) {
            if ($request->invoice) {
                if (!$subadmin->hasPermissionTo('einvoice')) {
                    $subadmin->givePermissionTo('einvoice');
                }
            } else {
                if ($subadmin->hasPermissionTo('einvoice')) {
                    $subadmin->revokePermissionTo('einvoice');
                }
            }
        }

        if ($request->has('admin')) {
            if ($request->admin) {
                if (!$subadmin->hasPermissionTo('AdminUser')) {
                    $subadmin->givePermissionTo('AdminUser');
                }
            } else {
                if ($subadmin->hasPermissionTo('AdminUser')) {
                    $subadmin->revokePermissionTo('AdminUser');
                }
            }
        }

        if ($request->has('billing')) {
            if ($request->billing) {
                if (!$subadmin->hasPermissionTo('myBilling')) {
                    $subadmin->givePermissionTo('myBilling');
                }
            } else {
                if ($subadmin->hasPermissionTo('myBilling')) {
                    $subadmin->revokePermissionTo('myBilling');
                }
            }
        }

        if ($request->has('config')) {
            if ($request->config) {
                if (!$subadmin->hasPermissionTo('configuration')) {
                    $subadmin->givePermissionTo('configuration');
                }
            } else {
                if ($subadmin->hasPermissionTo('configuration')) {
                    $subadmin->revokePermissionTo('configuration');
                }
            }
        }

        return redirect()->back();
    }
}
