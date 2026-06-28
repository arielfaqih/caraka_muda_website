<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Faq/Index', [
            'faq' => Faq::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Faq/Form', ['faq' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['order'] = $data['order'] ?? Faq::count();

        $faq = Faq::create($data);
        AuditLog::log('faq', "Tambah FAQ: {$faq->q}");

        return redirect()->route('admin.faq.index')->with('success', 'FAQ ditambahkan.');
    }

    public function edit(Faq $faq): Response
    {
        return Inertia::render('Admin/Faq/Form', ['faq' => $faq]);
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $data = $this->validated($request);
        $data['order'] = $data['order'] ?? $faq->order;

        $faq->update($data);
        AuditLog::log('faq', "Ubah FAQ: {$faq->q}");

        return redirect()->route('admin.faq.index')->with('success', 'FAQ diperbarui.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        AuditLog::log('faq', "Hapus FAQ: {$faq->q}");
        $faq->delete();

        return redirect()->route('admin.faq.index')->with('success', 'FAQ dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'q' => ['required', 'string', 'max:200'],
            'a' => ['required', 'string'],
            'order' => ['nullable', 'integer'],
        ]);
    }
}
