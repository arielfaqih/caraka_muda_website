<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pesan;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PesanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Pesan/Index', [
            'pesan' => Pesan::orderByDesc('created_at')->get(),
        ]);
    }

    public function markRead(Pesan $pesan): RedirectResponse
    {
        $pesan->update(['read' => true]);

        return back();
    }
}
