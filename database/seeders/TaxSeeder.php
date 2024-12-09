<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonFilePath = base_path('database/seeders/TaxTypes.json');

        // Read JSON file
        $json = File::get($jsonFilePath);
        
        // Decode JSON data into an array
        $data = json_decode($json, true);

        // Insert data into the database
        DB::table('tax_types')->insert($data);
    }
}
