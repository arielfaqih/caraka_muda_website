<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pendaftar extends Model
{
    protected $fillable = ['nama', 'email', 'whatsapp', 'institusi', 'divisi_id', 'motivasi', 'cv_path', 'portofolio_path', 'status'];

    protected $appends = ['cv_url', 'portofolio_url'];

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }

    public function getCvUrlAttribute(): ?string
    {
        return $this->cv_path ? Storage::disk('public')->url($this->cv_path) : null;
    }

    public function getPortofolioUrlAttribute(): ?string
    {
        return $this->portofolio_path ? Storage::disk('public')->url($this->portofolio_path) : null;
    }
}
