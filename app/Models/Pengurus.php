<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pengurus extends Model
{
    protected $fillable = ['name', 'role', 'divisi_id', 'struktur_type', 'seksi', 'period', 'bio', 'photo', 'ig', 'li', 'order'];

    protected $appends = ['photo_url'];

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo ? Storage::disk('public')->url($this->photo) : null;
    }
}
