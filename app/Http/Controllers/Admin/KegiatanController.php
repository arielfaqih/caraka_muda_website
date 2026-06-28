<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Kegiatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class KegiatanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Kegiatan/Index', [
            'kegiatan' => Kegiatan::orderByDesc('start_at')->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Kegiatan/Form', ['kegiatan' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = Str::slug($data['title']).'-'.Str::random(5);
        $data['seed'] = Kegiatan::count();

        $kegiatan = Kegiatan::create($data);
        AuditLog::log('kegiatan', "Tambah kegiatan: {$kegiatan->title}");

        return redirect()->route('admin.kegiatan.index')->with('success', 'Kegiatan ditambahkan.');
    }

    public function edit(Kegiatan $kegiatan): Response
    {
        return Inertia::render('Admin/Kegiatan/Form', ['kegiatan' => $kegiatan]);
    }

    public function update(Request $request, Kegiatan $kegiatan): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = Str::slug($data['title']);

        $kegiatan->update($data);
        AuditLog::log('kegiatan', "Ubah kegiatan: {$kegiatan->title}");

        return redirect()->route('admin.kegiatan.index')->with('success', 'Kegiatan diperbarui.');
    }

    public function destroy(Kegiatan $kegiatan): RedirectResponse
    {
        AuditLog::log('kegiatan', "Hapus kegiatan: {$kegiatan->title}");
        $kegiatan->delete();

        return redirect()->route('admin.kegiatan.index')->with('success', 'Kegiatan dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:150'],
            'start_at' => ['required', 'date'],
            'end_at' => ['required', 'date', 'after_or_equal:start_at'],
        ]);
    }
}
