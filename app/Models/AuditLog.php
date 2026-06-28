<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = ['action', 'actor', 'desc'];

    public static function log(string $action, string $desc, ?string $actor = null): void
    {
        static::create([
            'action' => $action,
            'actor' => $actor ?? auth()->user()?->name ?? '—',
            'desc' => $desc,
        ]);
    }
}
