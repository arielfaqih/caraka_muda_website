<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PengaturanController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Pengaturan/Edit', [
            'settings' => Setting::current(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'site_name' => ['required', 'string', 'max:120'],
            'tagline' => ['nullable', 'string', 'max:200'],
            'recruitment_open' => ['boolean'],
            'recruitment_opens_at' => ['nullable', 'date'],
            'recruitment_closes_at' => ['nullable', 'date', 'after_or_equal:recruitment_opens_at'],
            'contact.email' => ['nullable', 'email'],
            'contact.whatsapp' => ['nullable', 'string'],
            'contact.address' => ['nullable', 'string'],
        ]);

        Setting::current()->update($data);
        AuditLog::log('settings', 'Ubah pengaturan situs');

        return back()->with('success', 'Pengaturan disimpan.');
    }
}
