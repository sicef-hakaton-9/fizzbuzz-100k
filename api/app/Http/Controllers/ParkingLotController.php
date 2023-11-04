<?php

namespace App\Http\Controllers;

use App\Models\ParkingLot;

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
}
