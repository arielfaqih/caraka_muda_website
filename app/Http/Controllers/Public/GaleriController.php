<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Album;
use Inertia\Inertia;
use Inertia\Response;

class GaleriController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Galeri', [
            'albums' => Album::withCount('photos')->with('coverPhoto')->latest()->get(),
        ]);
    }

    public function show(Album $album): Response
    {
        return Inertia::render('Public/GaleriAlbum', [
            'album' => $album->load('photos'),
        ]);
    }
}
