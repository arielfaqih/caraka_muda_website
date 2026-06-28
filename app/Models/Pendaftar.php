<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftar extends Model
{
    protected $fillable = ['nama', 'email', 'whatsapp', 'institusi', 'divisi_id', 'motivasi', 'status'];

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }
}
