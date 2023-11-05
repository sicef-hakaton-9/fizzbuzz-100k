<?php

namespace App\Http\Controllers;

use App\Models\ParkingLot;
use Illuminate\Http\Request;

class ParkingLotController extends Controller
{
    public function index() 
    {
        $parkingLots = ParkingLot::all();

        return response()->json([
            'status' => 'success',
            'parkingLots' => $parkingLots,
        ]);
    }

    public function reserve(Request $request, ParkingLot $parkingLot)
    {
        $user = $request->user();

        if(!$user->hasActiveRide() && !$user->hasDestionationReservation()) {
            return response()->json([
                'status' => 'error',
                'message' => 'User has no active ride',
            ], 409);
        }

        if($parkingLot->free_spaces == 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Parking lot is full',
            ], 409);
        }

        $parkingLot->reserve($user);

        return response()->json([
            'status' => 'success',
            'message' => 'Parking lot reserved successfully',
            'parkingLotId' => $parkingLot->id,
        ]);
    }
}
