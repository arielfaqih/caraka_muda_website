<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Divisi;
use App\Models\Pendaftar;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BergabungController extends Controller
{
    public function show(): Response
    {
        $settings = Setting::current();

        return Inertia::render('Public/Bergabung', [
            'settings' => $settings,
            'recruitmentStatus' => $settings->recruitmentStatus(),
            'recruitmentOpen' => $settings->isRecruitmentOpen(),
            'opensAt' => $settings->recruitment_opens_at,
            'closesAt' => $settings->recruitment_closes_at,
            'divisi' => Divisi::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless(Setting::current()->isRecruitmentOpen(), 403, 'Pendaftaran sedang ditutup.');

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'whatsapp' => ['required', 'string', 'max:30'],
            'institusi' => ['nullable', 'string', 'max:160'],
            'divisi_id' => ['required', 'exists:divisis,id'],
            'motivasi' => ['nullable', 'string', 'max:5000'],
            'cv' => ['required', 'file', 'mimes:pdf', 'max:5120'],
            'portofolio' => ['nullable', 'file', 'mimes:pdf,doc,docx,zip', 'max:10240'],
        ]);

        $data['cv_path'] = $request->file('cv')->store('pendaftar/cv', 'public');
        if ($request->hasFile('portofolio')) {
            $data['portofolio_path'] = $request->file('portofolio')->store('pendaftar/portofolio', 'public');
        }
        unset($data['cv'], $data['portofolio']);

        Pendaftar::create($data + ['status' => 'baru']);

        return back()->with('success', 'Pendaftaran berhasil dikirim. Sampai jumpa!');
    }
}
