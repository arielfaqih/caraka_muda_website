<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use Inertia\Inertia;
use Inertia\Response;

class PrestasiController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Prestasi', [
            'prestasi' => Prestasi::orderByDesc('year')->get(),
        ]);
    }
}
