<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlbumPhoto extends Model
{
    protected $fillable = ['album_id', 'path', 'order'];

    protected $appends = ['photo_url'];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->path ? '/storage/'.$this->path : null;
    }
}
