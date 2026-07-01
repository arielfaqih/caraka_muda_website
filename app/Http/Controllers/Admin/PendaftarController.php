<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Pendaftar;
use App\Models\Setting;
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
            'settings' => Setting::current(),
        ]);
    }

    public function update(Request $request, Pendaftar $pendaftar): RedirectResponse
    {
        $data = $request->validate(['status' => ['required', 'in:baru,diproses,diterima,ditolak']]);

        $pendaftar->update($data);
        AuditLog::log('pendaftar', "Ubah status {$pendaftar->nama} → {$data['status']}");

        return back()->with('success', 'Status diperbarui.');
    }

    public function updateRecruitment(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'recruitment_open' => ['boolean'],
            'recruitment_opens_at' => ['nullable', 'date'],
            'recruitment_closes_at' => ['nullable', 'date', 'after_or_equal:recruitment_opens_at'],
        ]);

        Setting::current()->update($data);
        AuditLog::log('pendaftar', 'Ubah jadwal pendaftaran anggota baru');

        return back()->with('success', 'Jadwal pendaftaran disimpan.');
    }
}
