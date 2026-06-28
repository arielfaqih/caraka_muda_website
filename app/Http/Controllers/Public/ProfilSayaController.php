<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfilSayaController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user()->load('pengurus.divisi');

        abort_unless($user->pengurus, 404, 'Akun ini belum terhubung ke data pengurus.');

        return Inertia::render('Public/ProfilSaya', [
            'pengurus' => $user->pengurus,
        ]);
    }
}
