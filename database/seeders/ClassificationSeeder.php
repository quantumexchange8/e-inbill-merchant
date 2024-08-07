<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ClassificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonFilePath = base_path('database/seeders/classification.json');
        
        // Read JSON file
        $json = File::get($jsonFilePath);
        
        // Decode JSON data into an array
        $data = json_decode($json, true);

        // Insert data into the database
        DB::table('classifications')->insert($data);
    }
}
