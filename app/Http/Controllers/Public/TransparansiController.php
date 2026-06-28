<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use Inertia\Inertia;
use Inertia\Response;

class TransparansiController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Transparansi', [
            'groups' => Dokumen::orderBy('title')->get()->groupBy('cat'),
        ]);
    }
}
