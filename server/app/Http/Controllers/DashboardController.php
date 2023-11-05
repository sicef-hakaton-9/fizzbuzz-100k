<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {   
        $users = User::with(['bikeUsers' => function ($query) {
            $query->where('created_at', '>', Carbon::parse(now()->startOfMonth()->toDateTimeString()));
        }])->get();

        foreach($users as $user) {
            $totalTime = $user->bikeUsers->sum(function($bikeUser) {
                return Carbon::parse($bikeUser->ends_at)->diffInMinutes(Carbon::parse($bikeUser->starts_at));
            });
            
            $user->setAttribute('total_time', $totalTime);
        }

        $users = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'total_time' => $user->total_time,
            ];
        });

        return response()->json([
            'status' => 'success',
            'users' => collect($users)->sortByDesc('total_time'),
        ]);
    }
}
