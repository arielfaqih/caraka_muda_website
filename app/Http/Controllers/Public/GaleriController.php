<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Album;
use Inertia\Inertia;
use Inertia\Response;

class GaleriController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Galeri', [
            'albums' => Album::with('photos')->withCount('photos')->latest()->get(),
        ]);
    }
}
