<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Pendaftar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PendaftarController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Pendaftar/Index', [
            'pendaftar' => Pendaftar::with('divisi')->orderByDesc('created_at')->get(),
        ]);
    }

    public function update(Request $request, Pendaftar $pendaftar): RedirectResponse
    {
        $data = $request->validate(['status' => ['required', 'in:baru,diproses,diterima,ditolak']]);

        $pendaftar->update($data);
        AuditLog::log('pendaftar', "Ubah status {$pendaftar->nama} → {$data['status']}");

        return back()->with('success', 'Status diperbarui.');
    }
}
