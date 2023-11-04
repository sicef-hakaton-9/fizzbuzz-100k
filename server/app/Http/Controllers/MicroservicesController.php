<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MicroservicesController extends Controller
{
    // f-ja koja se poziva kada se vrsi provera da li je ispravan kod
    // bicikle unesen za otkljucavanje bicikle
     static function takeBikeAndStartRide($bike_code, $user_id) {

         /*return [
            'parking_lot' => ELFAK,
            'add_free_parking_space' => true,
            'bike' => 04,
            'bike_set_' => true,
            'user_id' => 01
         ]
         */
     }

     static function returnAndLockBike($user_id) {
         // preko user id-a nadjem koji bickl
    }
}
