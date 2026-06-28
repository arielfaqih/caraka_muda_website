<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'location', 'start_at', 'end_at', 'seed'];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    public function status(): string
    {
        $now = now();
        if ($now->lt($this->start_at)) return 'soon';
        if ($now->lte($this->end_at)) return 'live';
        return 'done';
    }
}
