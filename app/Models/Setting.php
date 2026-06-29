<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'site_name', 'founded', 'tagline', 'recruitment_open',
        'recruitment_opens_at', 'recruitment_closes_at',
        'recruitment_info', 'contact', 'stats', 'values',
    ];

    protected $casts = [
        'recruitment_open' => 'boolean',
        'recruitment_opens_at' => 'datetime',
        'recruitment_closes_at' => 'datetime',
        'recruitment_info' => 'array',
        'contact' => 'array',
        'stats' => 'array',
        'values' => 'array',
    ];

    /**
     * Master switch (recruitment_open) must be on; if a schedule window is also
     * set, the current time must additionally fall inside it.
     */
    public function isRecruitmentOpen(): bool
    {
        return $this->recruitmentStatus() === 'open';
    }

    public function recruitmentStatus(): string
    {
        if (! $this->recruitment_open) {
            return 'closed';
        }

        $now = now();

        if ($this->recruitment_opens_at && $now->lt($this->recruitment_opens_at)) {
            return 'before_open';
        }

        if ($this->recruitment_closes_at && $now->gt($this->recruitment_closes_at)) {
            return 'after_close';
        }

        return 'open';
    }

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
