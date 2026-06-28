<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'site_name', 'founded', 'tagline', 'recruitment_open',
        'recruitment_info', 'contact', 'stats', 'values',
    ];

    protected $casts = [
        'recruitment_open' => 'boolean',
        'recruitment_info' => 'array',
        'contact' => 'array',
        'stats' => 'array',
        'values' => 'array',
    ];

    public static function current(): self
    {
        return static::firstOrCreate([], [
            'site_name' => 'Caraka Muda',
            'founded' => 2020,
            'tagline' => 'Bergerak bersama, berdampak nyata.',
            'recruitment_open' => false,
            'recruitment_info' => [],
            'contact' => [],
            'stats' => [],
            'values' => [],
        ]);
    }
}
