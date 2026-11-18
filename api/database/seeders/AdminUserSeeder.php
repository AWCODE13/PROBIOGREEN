<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('app.admin.email');
        $password = config('app.admin.password');

        if (! $email || ! $password) {
            $this->command?->warn(
                'ADMIN_EMAIL dan ADMIN_PASSWORD belum diset; seeder admin dilewati.'
            );

            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => config('app.admin.name'),
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ],
        );
    }
}
