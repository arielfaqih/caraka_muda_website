<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Berita;
use App\Services\ImageOptimizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BeritaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Berita/Index', [
            'berita' => Berita::orderByDesc('published_at')->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Berita/Form', ['berita' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request, true);
        $data['slug'] = Str::slug($data['title']).'-'.Str::random(5);
        $data['author'] = $request->user()->name;
        $data['published_at'] = now();
        $data['seed'] = Berita::count();
        if ($request->hasFile('image')) {
            try {
                $data['image'] = ImageOptimizer::store($request->file('image'), 'berita');
            } catch (\Exception $e) {
                return back()->withErrors(['image' => 'Gagal mengunggah gambar. Coba lagi.'])->withInput();
            }
        }

        $berita = Berita::create($data);
        AuditLog::log('berita', "Tambah berita: {$berita->title}");

        return redirect()->route('admin.berita.index')->with('success', 'Berita ditambahkan.');
    }

    public function edit(Berita $berita): Response
    {
        return Inertia::render('Admin/Berita/Form', ['berita' => $berita]);
    }

    public function update(Request $request, Berita $berita): RedirectResponse
    {
        $data = $this->validated($request, false);
        $data['slug'] = Str::slug($data['title']);

        if ($request->hasFile('image')) {
            try {
                $newPath = ImageOptimizer::store($request->file('image'), 'berita');
            } catch (\Exception $e) {
                return back()->withErrors(['image' => 'Gagal mengunggah gambar. Coba lagi.'])->withInput();
            }
            if ($berita->image) {
                Storage::disk('public')->delete($berita->image);
            }
            $data['image'] = $newPath;
        }

        $berita->update($data);
        AuditLog::log('berita', "Ubah berita: {$berita->title}");

        return redirect()->route('admin.berita.index')->with('success', 'Berita diperbarui.');
    }

    public function destroy(Berita $berita): RedirectResponse
    {
        if ($berita->image) {
            Storage::disk('public')->delete($berita->image);
        }

        AuditLog::log('berita', "Hapus berita: {$berita->title}");
        $berita->delete();

        return redirect()->route('admin.berita.index')->with('success', 'Berita dihapus.');
    }

    private function validated(Request $request, bool $imageRequired): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'category' => ['required', 'string', 'max:60'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'status' => ['required', 'in:draft,published'],
            'featured' => ['boolean'],
            'image' => [$imageRequired ? 'required' : 'nullable', 'image', 'max:10240'],
        ]);
    }
}
