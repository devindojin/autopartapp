<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;
class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Country::create([
            "name" => "India",
            "lat" => 26.8466937,
            "lng" => 80.94616599999999
        ]);

    }
}
