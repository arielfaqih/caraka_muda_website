<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = Setting::current();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'generated_password' => $request->session()->get('generated_password'),
            ],
            'recruitment' => [
                'status' => $settings->recruitmentStatus(),
                'open' => $settings->isRecruitmentOpen(),
                'opensAt' => $settings->recruitment_opens_at,
                'closesAt' => $settings->recruitment_closes_at,
            ],
            'ticker' => [
                'Minta Liputan & Dokumentasi Kegiatan',
                'Tanya & Lapor lewat Layanan Terpadu',
                'Ajukan Siaran Pers ke Media',
                'Ajukan Kunjungan ke UPI',
                'Pasang Konten di Media Sosial & Videotron',
                'Minta Siaran Langsung (Live Streaming)',
            ],
        ];
    }
}
