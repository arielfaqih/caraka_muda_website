<?php

use App\Http\Controllers\Admin\AlbumController as AdminAlbumController;
use App\Http\Controllers\Admin\BeritaController as AdminBeritaController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\DivisiController as AdminDivisiController;
use App\Http\Controllers\Admin\DokumenController as AdminDokumenController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\KegiatanController as AdminKegiatanController;
use App\Http\Controllers\Admin\MitraController as AdminMitraController;
use App\Http\Controllers\Admin\PendaftarController as AdminPendaftarController;
use App\Http\Controllers\Admin\PengaturanController as AdminPengaturanController;
use App\Http\Controllers\Admin\PengurusController as AdminPengurusController;
use App\Http\Controllers\Admin\PesanController as AdminPesanController;
use App\Http\Controllers\Admin\PrestasiController as AdminPrestasiController;
use App\Http\Controllers\Admin\TimelineController as AdminTimelineController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\BergabungController;
use App\Http\Controllers\Public\BeritaController;
use App\Http\Controllers\Public\CariController;
use App\Http\Controllers\Public\FaqController;
use App\Http\Controllers\Public\GaleriController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\KegiatanController;
use App\Http\Controllers\Public\KontakController;
use App\Http\Controllers\Public\MitraController;
use App\Http\Controllers\Public\PrestasiController;
use App\Http\Controllers\Public\ProfilSayaController;
use App\Http\Controllers\Public\ProgramController;
use App\Http\Controllers\Public\StrukturController;
use App\Http\Controllers\Public\TentangController;
use App\Http\Controllers\Public\TimelineController;
use App\Http\Controllers\Public\TransparansiController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public site
|--------------------------------------------------------------------------
*/
Route::get('/ping', function () {
    DB::select('select 1');

    return response('ok');
})->name('ping');

Route::get('/', HomeController::class)->name('beranda');
Route::get('/tentang', TentangController::class)->name('tentang');
Route::get('/struktur', StrukturController::class)->name('struktur');
Route::get('/program', ProgramController::class)->name('program');

Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');

Route::get('/kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
Route::get('/kegiatan/{slug}', [KegiatanController::class, 'show'])->name('kegiatan.show');

Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri');
Route::get('/galeri/{album}', [GaleriController::class, 'show'])->name('galeri.show');
Route::get('/timeline', TimelineController::class)->name('timeline');
Route::get('/prestasi', PrestasiController::class)->name('prestasi');
Route::get('/transparansi', TransparansiController::class)->name('transparansi');
Route::get('/mitra', MitraController::class)->name('mitra');
Route::get('/faq', FaqController::class)->name('faq');
Route::get('/cari', CariController::class)->name('cari');

Route::get('/kontak', [KontakController::class, 'show'])->name('kontak');
Route::post('/kontak', [KontakController::class, 'store'])->name('kontak.store');

Route::get('/bergabung', [BergabungController::class, 'show'])->name('bergabung');
Route::post('/bergabung', [BergabungController::class, 'store'])->name('bergabung.store');

/*
|--------------------------------------------------------------------------
| Admin panel (Pengurus)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', AdminDashboardController::class)->middleware(['auth', 'admin'])->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

    Route::get('/berita', [AdminBeritaController::class, 'index'])->name('berita.index');
    Route::get('/berita/create', [AdminBeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [AdminBeritaController::class, 'store'])->name('berita.store');
    Route::get('/berita/{berita}/edit', [AdminBeritaController::class, 'edit'])->name('berita.edit');
    Route::put('/berita/{berita}', [AdminBeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{berita}', [AdminBeritaController::class, 'destroy'])->name('berita.destroy');

    Route::get('/pengurus', [AdminPengurusController::class, 'index'])->name('pengurus.index');
    Route::get('/pengurus/create', [AdminPengurusController::class, 'create'])->name('pengurus.create');
    Route::post('/pengurus', [AdminPengurusController::class, 'store'])->name('pengurus.store');
    Route::get('/pengurus/{pengurus}/edit', [AdminPengurusController::class, 'edit'])->name('pengurus.edit');
    Route::put('/pengurus/{pengurus}', [AdminPengurusController::class, 'update'])->name('pengurus.update');
    Route::delete('/pengurus/{pengurus}', [AdminPengurusController::class, 'destroy'])->name('pengurus.destroy');
    Route::post('/pengurus/{pengurus}/akun', [AdminPengurusController::class, 'createAccount'])->name('pengurus.akun.store');
    Route::put('/pengurus/{pengurus}/akun', [AdminPengurusController::class, 'resetPassword'])->name('pengurus.akun.reset');
    Route::delete('/pengurus/{pengurus}/akun', [AdminPengurusController::class, 'destroyAccount'])->name('pengurus.akun.destroy');

    Route::get('/divisi', [AdminDivisiController::class, 'index'])->name('divisi.index');
    Route::get('/divisi/create', [AdminDivisiController::class, 'create'])->name('divisi.create');
    Route::post('/divisi', [AdminDivisiController::class, 'store'])->name('divisi.store');
    Route::get('/divisi/{divisi}/edit', [AdminDivisiController::class, 'edit'])->name('divisi.edit');
    Route::put('/divisi/{divisi}', [AdminDivisiController::class, 'update'])->name('divisi.update');
    Route::delete('/divisi/{divisi}', [AdminDivisiController::class, 'destroy'])->name('divisi.destroy');

    Route::get('/kegiatan', [AdminKegiatanController::class, 'index'])->name('kegiatan.index');
    Route::get('/kegiatan/create', [AdminKegiatanController::class, 'create'])->name('kegiatan.create');
    Route::post('/kegiatan', [AdminKegiatanController::class, 'store'])->name('kegiatan.store');
    Route::get('/kegiatan/{kegiatan}/edit', [AdminKegiatanController::class, 'edit'])->name('kegiatan.edit');
    Route::put('/kegiatan/{kegiatan}', [AdminKegiatanController::class, 'update'])->name('kegiatan.update');
    Route::delete('/kegiatan/{kegiatan}', [AdminKegiatanController::class, 'destroy'])->name('kegiatan.destroy');

    Route::get('/album', [AdminAlbumController::class, 'index'])->name('album.index');
    Route::get('/album/create', [AdminAlbumController::class, 'create'])->name('album.create');
    Route::post('/album', [AdminAlbumController::class, 'store'])->name('album.store');
    Route::get('/album/{album}/edit', [AdminAlbumController::class, 'edit'])->name('album.edit');
    Route::put('/album/{album}', [AdminAlbumController::class, 'update'])->name('album.update');
    Route::delete('/album/{album}', [AdminAlbumController::class, 'destroy'])->name('album.destroy');
    Route::post('/album/{album}/foto', [AdminAlbumController::class, 'storePhoto'])->name('album.foto.store');
    Route::delete('/album/{album}/foto/{photo}', [AdminAlbumController::class, 'destroyPhoto'])->name('album.foto.destroy');
    Route::put('/album/{album}/foto/{photo}/sampul', [AdminAlbumController::class, 'setCoverPhoto'])->name('album.foto.sampul');

    Route::get('/dokumen', [AdminDokumenController::class, 'index'])->name('dokumen.index');
    Route::get('/dokumen/create', [AdminDokumenController::class, 'create'])->name('dokumen.create');
    Route::post('/dokumen', [AdminDokumenController::class, 'store'])->name('dokumen.store');
    Route::get('/dokumen/{dokumen}/edit', [AdminDokumenController::class, 'edit'])->name('dokumen.edit');
    Route::put('/dokumen/{dokumen}', [AdminDokumenController::class, 'update'])->name('dokumen.update');
    Route::delete('/dokumen/{dokumen}', [AdminDokumenController::class, 'destroy'])->name('dokumen.destroy');

    Route::get('/timeline', [AdminTimelineController::class, 'index'])->name('timeline.index');
    Route::get('/timeline/create', [AdminTimelineController::class, 'create'])->name('timeline.create');
    Route::post('/timeline', [AdminTimelineController::class, 'store'])->name('timeline.store');
    Route::get('/timeline/{timeline}/edit', [AdminTimelineController::class, 'edit'])->name('timeline.edit');
    Route::put('/timeline/{timeline}', [AdminTimelineController::class, 'update'])->name('timeline.update');
    Route::delete('/timeline/{timeline}', [AdminTimelineController::class, 'destroy'])->name('timeline.destroy');

    Route::get('/prestasi', [AdminPrestasiController::class, 'index'])->name('prestasi.index');
    Route::get('/prestasi/create', [AdminPrestasiController::class, 'create'])->name('prestasi.create');
    Route::post('/prestasi', [AdminPrestasiController::class, 'store'])->name('prestasi.store');
    Route::get('/prestasi/{prestasi}/edit', [AdminPrestasiController::class, 'edit'])->name('prestasi.edit');
    Route::put('/prestasi/{prestasi}', [AdminPrestasiController::class, 'update'])->name('prestasi.update');
    Route::delete('/prestasi/{prestasi}', [AdminPrestasiController::class, 'destroy'])->name('prestasi.destroy');

    Route::get('/mitra', [AdminMitraController::class, 'index'])->name('mitra.index');
    Route::get('/mitra/create', [AdminMitraController::class, 'create'])->name('mitra.create');
    Route::post('/mitra', [AdminMitraController::class, 'store'])->name('mitra.store');
    Route::get('/mitra/{mitra}/edit', [AdminMitraController::class, 'edit'])->name('mitra.edit');
    Route::put('/mitra/{mitra}', [AdminMitraController::class, 'update'])->name('mitra.update');
    Route::delete('/mitra/{mitra}', [AdminMitraController::class, 'destroy'])->name('mitra.destroy');

    Route::get('/faq', [AdminFaqController::class, 'index'])->name('faq.index');
    Route::get('/faq/create', [AdminFaqController::class, 'create'])->name('faq.create');
    Route::post('/faq', [AdminFaqController::class, 'store'])->name('faq.store');
    Route::get('/faq/{faq}/edit', [AdminFaqController::class, 'edit'])->name('faq.edit');
    Route::put('/faq/{faq}', [AdminFaqController::class, 'update'])->name('faq.update');
    Route::delete('/faq/{faq}', [AdminFaqController::class, 'destroy'])->name('faq.destroy');

    Route::get('/pendaftar', [AdminPendaftarController::class, 'index'])->name('pendaftar.index');
    Route::put('/pendaftar/rekrutmen', [AdminPendaftarController::class, 'updateRecruitment'])->name('pendaftar.rekrutmen.update');
    Route::put('/pendaftar/{pendaftar}', [AdminPendaftarController::class, 'update'])->name('pendaftar.update');

    Route::get('/pesan', [AdminPesanController::class, 'index'])->name('pesan.index');
    Route::put('/pesan/{pesan}/read', [AdminPesanController::class, 'markRead'])->name('pesan.read');

    Route::get('/pengaturan', [AdminPengaturanController::class, 'edit'])->name('pengaturan.edit');
    Route::put('/pengaturan', [AdminPengaturanController::class, 'update'])->name('pengaturan.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profil-saya', ProfilSayaController::class)->name('profil-saya');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
