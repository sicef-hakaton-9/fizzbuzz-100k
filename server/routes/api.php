<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BikeRentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ParkingLotController;
use App\Http\Controllers\SubcriptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:api')->group(function () {

    Route::get('/info', function (Request $request) {
        return response()->json([
            'message' => 'info',
        ]);
    });

    Route::get('/parking-lots', [ParkingLotController::class, 'index']);

    Route::post('/bikes/{bike:code}/rent', [BikeRentController::class, 'rent']);

    Route::post('/bikes/finish', [BikeRentController::class, 'finish']);

    Route::post('/bikes/{parkingLot}/reserve', [BikeRentController::class, 'reserve']);

    Route::post('/parking-lot/{parkingLot}/reserve', [ParkingLotController::class, 'reserve']);

    Route::get('/subscription-plans', [SubcriptionController::class, 'getSubscriptionPlans']);

    Route::post('/subscribe', [SubcriptionController::class, 'subscribe']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/user-ride-status', function (Request $request) {
        $user = $request->user();

        return response()->json([
            'status' => 'success',
            'currentRide' => $user->getActiveRide(),
        ]);
    });

    Route::get('/user-subscription-status', function (Request $request) {
        $user = $request->user();

        return response()->json([
            'status' => 'success',
            'hasActiveSubscription' => $user->hasActiveSubscription(),
        ]);
    });


    Route::get('/user-reservation-status', function (Request $request) {
        $user = $request->user();

        return response()->json([
            'status' => 'success',
            'hasActiveReservation' => $user->hasActiveReservation(),
        ]);
    });

// });

