<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Kegiatan;
use App\Models\Pendaftar;
use App\Models\Pesan;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'published' => Berita::published()->count(),
                'agenda' => Kegiatan::where('end_at', '>=', now())->count(),
                'pendaftarBaru' => Pendaftar::where('status', 'baru')->count(),
                'pesanBelumDibaca' => Pesan::where('read', false)->count(),
            ],
            'recentBerita' => Berita::orderByDesc('published_at')->take(5)->get(),
        ]);
    }
}
