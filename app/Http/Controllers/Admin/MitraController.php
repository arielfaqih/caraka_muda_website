<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Mitra;
use App\Services\ImageOptimizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MitraController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Mitra/Index', [
            'mitra' => Mitra::orderBy('name')->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Mitra/Form', ['mitra' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('logo')) {
            try {
                $data['logo'] = ImageOptimizer::store($request->file('logo'), 'mitra');
            } catch (\Exception $e) {
                return back()->withErrors(['logo' => 'Gagal mengunggah logo. Coba lagi.'])->withInput();
            }
        }

        $mitra = Mitra::create($data);
        AuditLog::log('mitra', "Tambah mitra: {$mitra->name}");

        return redirect()->route('admin.mitra.index')->with('success', 'Mitra ditambahkan.');
    }

    public function edit(Mitra $mitra): Response
    {
        return Inertia::render('Admin/Mitra/Form', ['mitra' => $mitra]);
    }

    public function update(Request $request, Mitra $mitra): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('logo')) {
            try {
                $newPath = ImageOptimizer::store($request->file('logo'), 'mitra');
            } catch (\Exception $e) {
                return back()->withErrors(['logo' => 'Gagal mengunggah logo. Coba lagi.'])->withInput();
            }
            if ($mitra->logo) {
                Storage::disk('public')->delete($mitra->logo);
            }
            $data['logo'] = $newPath;
        }

        $mitra->update($data);
        AuditLog::log('mitra', "Ubah mitra: {$mitra->name}");

        return redirect()->route('admin.mitra.index')->with('success', 'Mitra diperbarui.');
    }

    public function destroy(Mitra $mitra): RedirectResponse
    {
        if ($mitra->logo) {
            Storage::disk('public')->delete($mitra->logo);
        }

        AuditLog::log('mitra', "Hapus mitra: {$mitra->name}");
        $mitra->delete();

        return redirect()->route('admin.mitra.index')->with('success', 'Mitra dihapus.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'cat' => ['required', 'string', 'max:60'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);

        unset($data['logo']);

        return $data;
    }
}
