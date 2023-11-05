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

    /**
     * Reserve parking lot space
     */
    public function reserve(User $user)
    {
        $user->update([
            'parking_lot_id' => $this->id,
        ]);

        $this->update([
            'free_spaces' => $this->free_spaces - 1,
        ]);
    }

    /**
     * Return parking lot space
     */
    public function returnBikeSpace()
    {
        $this->update([
            'free_spaces' => $this->free_spaces + 1,
        ]);
    }
}
