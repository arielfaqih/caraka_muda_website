<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Divisi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DivisiController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Divisi/Index', [
            'divisi' => Divisi::withCount(['pengurus', 'pendaftars'])->orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Divisi/Form', ['divisi' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['order'] = $data['order'] ?? Divisi::count();

        $divisi = Divisi::create($data);
        AuditLog::log('divisi', "Tambah divisi: {$divisi->name}");

        return redirect()->route('admin.divisi.index')->with('success', 'Divisi ditambahkan.');
    }

    public function edit(Divisi $divisi): Response
    {
        return Inertia::render('Admin/Divisi/Form', ['divisi' => $divisi]);
    }

    public function update(Request $request, Divisi $divisi): RedirectResponse
    {
        $data = $this->validated($request);
        $data['order'] = $data['order'] ?? $divisi->order;

        $divisi->update($data);
        AuditLog::log('divisi', "Ubah divisi: {$divisi->name}");

        return redirect()->route('admin.divisi.index')->with('success', 'Divisi diperbarui.');
    }

    public function destroy(Divisi $divisi): RedirectResponse
    {
        AuditLog::log('divisi', "Hapus divisi: {$divisi->name}");
        $divisi->delete();

        return redirect()->route('admin.divisi.index')->with('success', 'Divisi dihapus. Pengurus & pendaftar terkait jadi tanpa divisi.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'icon' => ['required', 'string', 'max:30'],
            'desc' => ['nullable', 'string', 'max:500'],
            'order' => ['nullable', 'integer'],
        ]);
    }
}
