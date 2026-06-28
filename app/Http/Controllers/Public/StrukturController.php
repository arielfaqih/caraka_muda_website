<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Pengurus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StrukturController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $periods = Pengurus::orderByDesc('period')->distinct()->pluck('period');
        $period = $request->string('period')->toString() ?: $periods->first();

        return Inertia::render('Public/Struktur', [
            'periods' => $periods,
            'period' => $period,
            'internal' => [
                'inti' => Pengurus::where('period', $period)->where('struktur_type', 'internal')->whereNull('divisi_id')->orderBy('order')->get(),
                'kadiv' => Pengurus::with('divisi')->where('period', $period)->where('struktur_type', 'internal')->whereNotNull('divisi_id')->orderBy('order')->get(),
            ],
            'kkipp' => [
                'koordinator' => Pengurus::where('period', $period)->where('struktur_type', 'kkipp')->whereNull('seksi')->orderBy('order')->get(),
                'seksi' => Pengurus::where('period', $period)->where('struktur_type', 'kkipp')->whereNotNull('seksi')->orderBy('order')->get()->groupBy('seksi'),
            ],
        ]);
    }
}
