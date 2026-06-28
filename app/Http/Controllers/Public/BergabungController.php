<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Divisi;
use App\Models\Pendaftar;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BergabungController extends Controller
{
    public function show(): Response
    {
        $settings = Setting::current();

        return Inertia::render('Public/Bergabung', [
            'settings' => $settings,
            'recruitmentOpen' => $settings->recruitment_open,
            'divisi' => Divisi::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless(Setting::current()->recruitment_open, 403, 'Pendaftaran sedang ditutup.');

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'whatsapp' => ['required', 'string', 'max:30'],
            'institusi' => ['nullable', 'string', 'max:160'],
            'divisi_id' => ['required', 'exists:divisis,id'],
            'motivasi' => ['nullable', 'string', 'max:5000'],
        ]);

        Pendaftar::create($data + ['status' => 'baru']);

        return back()->with('success', 'Pendaftaran berhasil dikirim. Sampai jumpa!');
    }
}
