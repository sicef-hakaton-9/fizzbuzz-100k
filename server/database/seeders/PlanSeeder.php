<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'Obican plan',
            'description' => 'Ovo je opis Obicnog plana',
            'minutes' => '1000',
            'price' => '300'
        ]);

        Plan::create([
            'name' => 'Bolji plan',
            'description' => 'Ovo je opis Boljeg plana',
            'minutes' => '1800',
            'price' => '500'
        ]);

        Plan::create([
            'name' => 'Jos Bolji plan',
            'description' => 'Ovo je opis Jos Boljeg plana',
            'minutes' => '3600',
            'price' => '1000'
        ]);
    }
}
