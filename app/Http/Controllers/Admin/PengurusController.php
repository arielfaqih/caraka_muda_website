<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Divisi;
use App\Models\Pengurus;
use App\Models\User;
use App\Services\ImageOptimizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PengurusController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pengurus::with(['divisi', 'user'])->orderByDesc('period')->orderBy('struktur_type')->orderBy('order');

        if ($type = $request->string('struktur_type')->toString()) {
            $query->where('struktur_type', $type);
        }
        if ($search = $request->string('search')->toString()) {
            $query->where('name', 'like', "%{$search}%");
        }

        return Inertia::render('Admin/Pengurus/Index', [
            'pengurus' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('struktur_type', 'search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Pengurus/Form', [
            'pengurus' => null,
            'divisis' => Divisi::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('photo')) {
            try {
                $data['photo'] = ImageOptimizer::store($request->file('photo'), 'pengurus');
            } catch (\Exception $e) {
                return back()->withErrors(['photo' => 'Gagal mengunggah foto. Coba lagi.'])->withInput();
            }
        }

        $pengurus = Pengurus::create($data);
        AuditLog::log('pengurus', "Tambah pengurus: {$pengurus->name}");

        return redirect()->route('admin.pengurus.index')->with('success', 'Pengurus ditambahkan.');
    }

    public function edit(Pengurus $pengurus): Response
    {
        return Inertia::render('Admin/Pengurus/Form', [
            'pengurus' => $pengurus->load('user'),
            'divisis' => Divisi::orderBy('order')->get(),
        ]);
    }

    public function update(Request $request, Pengurus $pengurus): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('photo')) {
            try {
                $newPath = ImageOptimizer::store($request->file('photo'), 'pengurus');
            } catch (\Exception $e) {
                return back()->withErrors(['photo' => 'Gagal mengunggah foto. Coba lagi.'])->withInput();
            }
            if ($pengurus->photo) {
                Storage::disk('public')->delete($pengurus->photo);
            }
            $data['photo'] = $newPath;
        }

        $pengurus->update($data);
        AuditLog::log('pengurus', "Ubah pengurus: {$pengurus->name}");

        return redirect()->route('admin.pengurus.index')->with('success', 'Pengurus diperbarui.');
    }

    public function destroy(Pengurus $pengurus): RedirectResponse
    {
        if ($pengurus->photo) {
            Storage::disk('public')->delete($pengurus->photo);
        }

        AuditLog::log('pengurus', "Hapus pengurus: {$pengurus->name}");
        $pengurus->delete();

        return redirect()->route('admin.pengurus.index')->with('success', 'Pengurus dihapus.');
    }

    public function createAccount(Request $request, Pengurus $pengurus): RedirectResponse
    {
        abort_if($pengurus->user, 422, 'Pengurus ini sudah punya akun.');

        $data = $request->validate([
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
        ]);

        $password = Str::password(10, symbols: false);

        User::create([
            'name' => $pengurus->name,
            'email' => $data['email'],
            'password' => Hash::make($password),
            'role' => 'member',
            'pengurus_id' => $pengurus->id,
        ]);

        AuditLog::log('pengurus', "Buat akun login untuk: {$pengurus->name}");

        return redirect()->route('admin.pengurus.edit', $pengurus)
            ->with('success', 'Akun dibuat.')
            ->with('generated_password', $password);
    }

    public function resetPassword(Pengurus $pengurus): RedirectResponse
    {
        $user = $pengurus->user;
        abort_unless($user, 404);

        $password = Str::password(10, symbols: false);
        $user->update(['password' => Hash::make($password)]);

        AuditLog::log('pengurus', "Reset password akun: {$pengurus->name}");

        return redirect()->route('admin.pengurus.edit', $pengurus)
            ->with('success', 'Password direset.')
            ->with('generated_password', $password);
    }

    public function destroyAccount(Pengurus $pengurus): RedirectResponse
    {
        $user = $pengurus->user;
        abort_unless($user, 404);
        $user->delete();

        AuditLog::log('pengurus', "Hapus akun login: {$pengurus->name}");

        return redirect()->route('admin.pengurus.edit', $pengurus)->with('success', 'Akun dihapus.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'role' => ['required', 'string', 'max:120'],
            'struktur_type' => ['required', 'in:internal,kkipp'],
            'divisi_id' => ['nullable', 'exists:divisis,id'],
            'seksi' => ['nullable', 'string', 'max:150'],
            'period' => ['required', 'string', 'max:20'],
            'bio' => ['nullable', 'string'],
            'ig' => ['nullable', 'string', 'max:60'],
            'li' => ['nullable', 'string', 'max:60'],
            'order' => ['nullable', 'integer'],
            'photo' => ['nullable', 'image', 'max:5120'],
        ]);

        unset($data['photo']);
        $data['order'] = $data['order'] ?? 0;

        if ($data['struktur_type'] === 'internal') {
            $data['seksi'] = null;
        } else {
            $data['divisi_id'] = null;
        }

        return $data;
    }
}
