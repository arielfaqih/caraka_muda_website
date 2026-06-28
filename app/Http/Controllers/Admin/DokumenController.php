<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Dokumen;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DokumenController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dokumen/Index', [
            'dokumen' => Dokumen::orderByDesc('created_at')->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Dokumen/Form', ['dokumen' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['file_path'] = $request->file('file')->store('dokumen', 'public');

        $dokumen = Dokumen::create($data);
        AuditLog::log('dokumen', "Tambah dokumen: {$dokumen->title}");

        return redirect()->route('admin.dokumen.index')->with('success', 'Dokumen ditambahkan.');
    }

    public function edit(Dokumen $dokumen): Response
    {
        return Inertia::render('Admin/Dokumen/Form', ['dokumen' => $dokumen]);
    }

    public function update(Request $request, Dokumen $dokumen): RedirectResponse
    {
        $data = $this->validated($request, false);

        if ($request->hasFile('file')) {
            if ($dokumen->file_path) {
                Storage::disk('public')->delete($dokumen->file_path);
            }
            $data['file_path'] = $request->file('file')->store('dokumen', 'public');
        }

        $dokumen->update($data);
        AuditLog::log('dokumen', "Ubah dokumen: {$dokumen->title}");

        return redirect()->route('admin.dokumen.index')->with('success', 'Dokumen diperbarui.');
    }

    public function destroy(Dokumen $dokumen): RedirectResponse
    {
        if ($dokumen->file_path) {
            Storage::disk('public')->delete($dokumen->file_path);
        }

        AuditLog::log('dokumen', "Hapus dokumen: {$dokumen->title}");
        $dokumen->delete();

        return redirect()->route('admin.dokumen.index')->with('success', 'Dokumen dihapus.');
    }

    private function validated(Request $request, bool $fileRequired = true): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'cat' => ['required', 'string', 'max:60'],
            'file' => [$fileRequired ? 'required' : 'nullable', 'file', 'mimes:pdf,doc,docx,xls,xlsx', 'max:10240'],
        ]);

        unset($data['file']);

        return $data;
    }
}
