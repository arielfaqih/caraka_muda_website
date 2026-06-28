<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class TentangController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Tentang', [
            'settings' => Setting::current(),
        ]);
    }
}
