<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = ['dashboard', 'itemListing', 'salesReport', 'AdminUser', 'myBilling', 'configuration', 'einvoice'];

        foreach ($permissions as $permission) {
            if (!Permission::where('name', $permission)->where('guard_name', 'web')->exists()) {
                Permission::create(['name' => $permission, 'guard_name' => 'web']);
            }
        }
    }
}
