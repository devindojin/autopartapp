<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;
class PlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'type' => 'RECURRING',
                'name' => 'Basic Plan',
                'price' => 2.99,
                'interval' => 'EVERY_30_DAYS',
                'capped_amount' => 0,
                'terms' => '',
                'trial_days' => 3,
                'test' => true,
                'on_install' => true,
            ],
            [
                'type' => 'RECURRING',
                'name' => 'Pro Plan',
                'price' => 5.99,
                'interval' => 'EVERY_30_DAYS',
                'capped_amount' => 0,
                'terms' => '',
                'trial_days' => 3,
                'test' => true,
                'on_install' => false,
            ]
        ];
        Plan::insert($data);
    }
}
