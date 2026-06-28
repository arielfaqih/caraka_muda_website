<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'author', 'excerpt', 'body',
        'status', 'featured', 'seed', 'image', 'published_at',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $appends = ['image_url'];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function getImageUrlAttribute(): ?string
    {
        // Host-relative path so it works regardless of the host/port the app
        // is actually accessed from (APP_URL doesn't always match that).
        return $this->image ? '/storage/'.$this->image : null;
    }
}
