<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingLot extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'total_spaces',
        'free_spaces',
        'longitude',
        'latitude'
    ];
}
