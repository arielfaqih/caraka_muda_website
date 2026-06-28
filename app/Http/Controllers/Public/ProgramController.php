<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Divisi;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Program', [
            'divisi' => Divisi::orderBy('order')->get(),
        ]);
    }
}
