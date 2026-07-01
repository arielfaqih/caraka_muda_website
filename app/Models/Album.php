<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = ['title', 'year', 'seed'];

    public function photos()
    {
        return $this->hasMany(AlbumPhoto::class)->orderBy('order');
    }

    public function coverPhoto()
    {
        return $this->hasOne(AlbumPhoto::class)->oldestOfMany('order');
    }
}
