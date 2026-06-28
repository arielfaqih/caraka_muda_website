<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Inertia\Inertia;
use Inertia\Response;

class KegiatanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Kegiatan/Index', [
            'kegiatan' => Kegiatan::orderByDesc('start_at')->get(),
        ]);
    }

    public function show(string $slug): Response
    {
        $kegiatan = Kegiatan::where('slug', $slug)->firstOrFail();

        return Inertia::render('Public/Kegiatan/Show', [
            'kegiatan' => $kegiatan,
        ]);
    }
}
