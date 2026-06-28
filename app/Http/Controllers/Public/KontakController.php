<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Pesan;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KontakController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Public/Kontak', [
            'settings' => Setting::current(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'subjek' => ['nullable', 'string', 'max:160'],
            'pesan' => ['required', 'string', 'max:5000'],
        ]);

        Pesan::create($data);

        return back()->with('success', 'Pesan kamu sudah terkirim. Terima kasih!');
    }
}
