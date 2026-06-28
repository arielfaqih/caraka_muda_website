<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    protected $fillable = ['name', 'icon', 'desc', 'order'];

    public function pengurus()
    {
        return $this->hasMany(Pengurus::class);
    }

    public function pendaftars()
    {
        return $this->hasMany(Pendaftar::class);
    }
}
