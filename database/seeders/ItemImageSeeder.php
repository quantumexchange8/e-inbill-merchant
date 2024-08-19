<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/1.svg',
            'value' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/2.svg',
            'value' => '2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/3.svg',
            'value' => '3',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/4.svg',
            'value' => '4',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/5.svg',
            'value' => '5',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/6.svg',
            'value' => '6',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/7.svg',
            'value' => '7',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/8.svg',
            'value' => '8',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/9.svg',
            'value' => '9',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/10.svg',
            'value' => '10',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/11.svg',
            'value' => '11',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/12.svg',
            'value' => '12',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/13.svg',
            'value' => '13',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/14.svg',
            'value' => '14',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/15.svg',
            'value' => '15',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('item_images')->insert([
            'image_path' => '/assets/items_images/16.svg',
            'value' => '16',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
