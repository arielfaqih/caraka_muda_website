<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Dokumen extends Model
{
    protected $fillable = ['title', 'cat', 'file_path'];

    protected $appends = ['file_url'];

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? Storage::disk('public')->url($this->file_path) : null;
    }
}
