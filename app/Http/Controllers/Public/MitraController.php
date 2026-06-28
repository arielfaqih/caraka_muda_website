<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use Inertia\Inertia;
use Inertia\Response;

class MitraController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Mitra', [
            'groups' => Mitra::orderBy('name')->get()->groupBy('cat'),
        ]);
    }
}
