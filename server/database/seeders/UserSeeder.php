<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@doe.com',
            'phone' => '381628584563',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@doe.com',
            'phone' => '381628589875',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'first_name' => 'Ben',
            'last_name' => 'Doe',
            'email' => 'ben@doe.com',
            'phone' => '381628581875',
            'password' => bcrypt('password'),
        ]);
    }
}
