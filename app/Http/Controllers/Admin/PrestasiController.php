<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Prestasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PrestasiController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Prestasi/Index', [
            'prestasi' => Prestasi::orderByDesc('year')->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Prestasi/Form', ['prestasi' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $prestasi = Prestasi::create($this->validated($request));
        AuditLog::log('prestasi', "Tambah prestasi: {$prestasi->title}");

        return redirect()->route('admin.prestasi.index')->with('success', 'Prestasi ditambahkan.');
    }

    public function edit(Prestasi $prestasi): Response
    {
        return Inertia::render('Admin/Prestasi/Form', ['prestasi' => $prestasi]);
    }

    public function update(Request $request, Prestasi $prestasi): RedirectResponse
    {
        $prestasi->update($this->validated($request));
        AuditLog::log('prestasi', "Ubah prestasi: {$prestasi->title}");

        return redirect()->route('admin.prestasi.index')->with('success', 'Prestasi diperbarui.');
    }

    public function destroy(Prestasi $prestasi): RedirectResponse
    {
        AuditLog::log('prestasi', "Hapus prestasi: {$prestasi->title}");
        $prestasi->delete();

        return redirect()->route('admin.prestasi.index')->with('success', 'Prestasi dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'desc' => ['nullable', 'string', 'max:500'],
        ]);
    }
}
