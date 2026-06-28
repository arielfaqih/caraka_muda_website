<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Berita;
use App\Models\Divisi;
use App\Models\Kegiatan;
use App\Models\Mitra;
use App\Models\Pengurus;
use App\Models\Prestasi;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $berita = Berita::published()->orderByDesc('published_at')->get();
        $feat = $berita->firstWhere('featured', true) ?? $berita->first();
        $rest = $berita->reject(fn ($b) => $feat && $b->is($feat))->take(2)->values();

        $settings = Setting::current();
        $settings->stats = $this->liveStats($settings);

        return Inertia::render('Public/Beranda', [
            'settings' => $settings,
            'featured' => $feat,
            'latestNews' => $rest,
            'divisi' => Divisi::orderBy('order')->get(),
            'albums' => Album::withCount('photos')->latest()->take(6)->get(),
            'mitra' => Mitra::take(6)->get(),
        ]);
    }

    /**
     * Compute homepage stats directly from current data instead of stored copy.
     */
    private function liveStats(Setting $settings): array
    {
        return [
            ['v' => Pengurus::count().'+', 'l' => 'Anggota Aktif'],
            ['v' => Kegiatan::where('end_at', '<', now())->count().'+', 'l' => 'Kegiatan Terlaksana'],
            ['v' => (string) max(0, now()->year - $settings->founded), 'l' => 'Tahun Berkarya'],
            ['v' => (string) Prestasi::count(), 'l' => 'Penghargaan'],
        ];
    }
}
