<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\Faq;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CariController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $q = $request->string('q')->toString();
        $results = collect();

        if ($q !== '') {
            $like = "%{$q}%";

            Berita::published()
                ->where(fn ($w) => $w->where('title', 'like', $like)->orWhere('excerpt', 'like', $like))
                ->get()
                ->each(fn ($b) => $results->push([
                    't' => $b->title, 'd' => "Berita · {$b->category}", 'nav' => "berita/{$b->slug}",
                ]));

            Kegiatan::where(fn ($w) => $w->where('title', 'like', $like)->orWhere('description', 'like', $like))
                ->get()
                ->each(fn ($k) => $results->push([
                    't' => $k->title, 'd' => "Kegiatan · {$k->location}", 'nav' => "kegiatan/{$k->slug}",
                ]));

            Dokumen::where('title', 'like', $like)->get()
                ->each(fn ($d) => $results->push(['t' => $d->title, 'd' => "Dokumen · {$d->cat}", 'nav' => 'transparansi']));

            Faq::where(fn ($w) => $w->where('q', 'like', $like)->orWhere('a', 'like', $like))->get()
                ->each(fn ($f) => $results->push(['t' => $f->q, 'd' => 'FAQ', 'nav' => 'faq']));
        }

        return Inertia::render('Public/Cari', [
            'q' => $q,
            'results' => $results->values(),
        ]);
    }
}
