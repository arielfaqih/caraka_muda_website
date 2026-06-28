<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BeritaController extends Controller
{
    public function index(Request $request): Response
    {
        $list = Berita::published()
            ->when($request->string('q')->toString(), function ($query, $q) {
                $query->where(function ($w) use ($q) {
                    $w->where('title', 'like', "%{$q}%")->orWhere('excerpt', 'like', "%{$q}%");
                });
            })
            ->when($request->string('category')->toString(), fn ($query, $cat) => $query->where('category', $cat))
            ->orderByDesc('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Public/Berita/Index', [
            'berita' => $list,
            'filters' => $request->only(['q', 'category']),
            'categories' => Berita::published()->distinct()->pluck('category'),
        ]);
    }

    public function show(string $slug): Response
    {
        $berita = Berita::published()->where('slug', $slug)->firstOrFail();

        $related = Berita::published()
            ->where('id', '!=', $berita->id)
            ->where('category', $berita->category)
            ->take(3)
            ->get();

        if ($related->isEmpty()) {
            $related = Berita::published()->where('id', '!=', $berita->id)->take(3)->get();
        }

        return Inertia::render('Public/Berita/Show', [
            'berita' => $berita,
            'related' => $related,
        ]);
    }
}
