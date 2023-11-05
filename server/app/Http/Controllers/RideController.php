<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RideController extends Controller
{
    public function report(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'comment' => 'required|string',
        ]);

        if(! $user->hasActiveRide()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You do not have an active ride',
            ], 400);
        }

        $ride = $user->getActiveRide();

        $ride->update([
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Ride reported successfully',
        ]);
    }
}
