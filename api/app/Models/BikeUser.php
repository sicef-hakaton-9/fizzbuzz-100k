<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BikeUser extends Pivot
{
    use HasFactory;

    protected $table = 'bike_users';

    /**
     * Get the bike that owns the BikeUser
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bike(): BelongsTo
    {
        return $this->belongsTo(Bike::class);
    }

    /**
     * Get the user that owns the BikeUser
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
