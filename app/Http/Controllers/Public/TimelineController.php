<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Timeline;
use Inertia\Inertia;
use Inertia\Response;

class TimelineController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Timeline', [
            'timeline' => Timeline::orderBy('date')->orderBy('order')->get(),
        ]);
    }
}
