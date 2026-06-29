<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Timeline;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimelineController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Timeline/Index', [
            'timeline' => Timeline::orderBy('date')->orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Timeline/Form', ['timeline' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['order'] = $data['order'] ?? Timeline::count();

        $timeline = Timeline::create($data);
        AuditLog::log('timeline', "Tambah momen timeline: {$timeline->title}");

        return redirect()->route('admin.timeline.index')->with('success', 'Momen timeline ditambahkan.');
    }

    public function edit(Timeline $timeline): Response
    {
        return Inertia::render('Admin/Timeline/Form', ['timeline' => $timeline]);
    }

    public function update(Request $request, Timeline $timeline): RedirectResponse
    {
        $data = $this->validated($request);
        $data['order'] = $data['order'] ?? $timeline->order;

        $timeline->update($data);
        AuditLog::log('timeline', "Ubah momen timeline: {$timeline->title}");

        return redirect()->route('admin.timeline.index')->with('success', 'Momen timeline diperbarui.');
    }

    public function destroy(Timeline $timeline): RedirectResponse
    {
        AuditLog::log('timeline', "Hapus momen timeline: {$timeline->title}");
        $timeline->delete();

        return redirect()->route('admin.timeline.index')->with('success', 'Momen timeline dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string', 'max:1000'],
            'date' => ['required', 'date'],
            'order' => ['nullable', 'integer'],
        ]);
    }
}
