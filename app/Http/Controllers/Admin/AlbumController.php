<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\AlbumPhoto;
use App\Models\AuditLog;
use App\Services\ImageOptimizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AlbumController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Album/Index', [
            'album' => Album::withCount('photos')->latest()->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Album/Form', ['album' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['seed'] = Album::count();

        $album = Album::create($data);
        AuditLog::log('album', "Tambah album: {$album->title}");

        return redirect()->route('admin.album.edit', $album)->with('success', 'Album dibuat. Tambahkan foto di bawah.');
    }

    public function edit(Album $album): Response
    {
        return Inertia::render('Admin/Album/Form', ['album' => $album->load('photos')]);
    }

    public function update(Request $request, Album $album): RedirectResponse
    {
        $album->update($this->validated($request));
        AuditLog::log('album', "Ubah album: {$album->title}");

        return redirect()->route('admin.album.index')->with('success', 'Album diperbarui.');
    }

    public function destroy(Album $album): RedirectResponse
    {
        foreach ($album->photos as $photo) {
            Storage::disk('public')->delete($photo->path);
        }

        AuditLog::log('album', "Hapus album: {$album->title}");
        $album->delete();

        return redirect()->route('admin.album.index')->with('success', 'Album dihapus.');
    }

    public function storePhoto(Request $request, Album $album): RedirectResponse
    {
        $request->validate([
            'photos' => ['required', 'array'],
            'photos.*' => ['image', 'max:5120'],
        ]);

        $order = $album->photos()->max('order') + 1;
        foreach ($request->file('photos') as $file) {
            try {
                $path = ImageOptimizer::store($file, "albums/{$album->id}");
            } catch (\Exception $e) {
                return back()->withErrors(['photos' => 'Gagal mengunggah satu atau lebih foto. Coba lagi.']);
            }
            AlbumPhoto::create([
                'album_id' => $album->id,
                'path' => $path,
                'order' => $order++,
            ]);
        }

        AuditLog::log('album', "Tambah foto ke album: {$album->title}");

        return redirect()->route('admin.album.edit', $album)->with('success', 'Foto ditambahkan.');
    }

    public function destroyPhoto(Album $album, AlbumPhoto $photo): RedirectResponse
    {
        abort_unless($photo->album_id === $album->id, 404);

        Storage::disk('public')->delete($photo->path);
        $photo->delete();

        AuditLog::log('album', "Hapus foto dari album: {$album->title}");

        return redirect()->route('admin.album.edit', $album)->with('success', 'Foto dihapus.');
    }

    public function setCoverPhoto(Album $album, AlbumPhoto $photo): RedirectResponse
    {
        abort_unless($photo->album_id === $album->id, 404);

        $coverOrder = $album->photos()->min('order');

        if ($photo->order !== $coverOrder) {
            $oldOrder = $photo->order;
            $photo->update(['order' => $coverOrder]);
            $album->photos()->where('id', '!=', $photo->id)->where('order', $coverOrder)->update(['order' => $oldOrder]);
        }

        AuditLog::log('album', "Ubah foto sampul album: {$album->title}");

        return redirect()->route('admin.album.edit', $album)->with('success', 'Foto sampul diperbarui.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
        ]);
    }
}
