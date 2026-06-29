# Analisis Project — Website Caraka Muda

## 1. Ringkasan

Website resmi organisasi kepemudaan **Caraka Muda**, berisi situs publik (profil, berita, kegiatan, galeri, transparansi, pendaftaran anggota) dan panel admin untuk mengelola seluruh kontennya. Dibangun dengan arsitektur **monolith Laravel + Inertia.js**, artinya satu codebase backend (PHP) yang merender halaman React tanpa perlu REST API terpisah.

## 2. Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Bahasa backend | PHP | ^8.3 |
| Framework backend | Laravel | ^13.8 |
| Jembatan SPA | Inertia.js (`inertiajs/inertia-laravel`) | ^2.0 |
| Frontend | React | ^18.2 |
| Build tool | Vite | ^8.0 |
| Styling | Tailwind CSS | ^3.2 (+ `@tailwindcss/forms`) |
| Auth scaffolding | Laravel Breeze | ^2.4 |
| API token (tidak aktif dipakai) | Laravel Sanctum | ^4.0 |
| Route helper di JS | Tightenco Ziggy | ^2.0 |
| Database | PostgreSQL (di-hosting di Supabase) | — |
| File storage | Local disk (default) / Cloudflare R2 (siap pakai, opsional via env) | — |
| Dev tooling | Laravel Pail (log viewer), Pint (formatter), Pao | — |
| Testing | PHPUnit | ^12.5 |

**Pola arsitektur:** Server-Driven SPA. Tidak ada REST/JSON API publik — setiap halaman dirender lewat `Inertia::render()` dari controller Laravel, lalu React menerima props sebagai JSON dan merender komponen yang sesuai. Routing URL tetap ditangani Laravel (`routes/web.php`), bukan React Router.

## 3. Struktur Direktori Penting

```
app/
  Http/Controllers/
    Public/      → 14 controller untuk halaman publik (beranda, berita, kegiatan, dst.)
    Admin/       → 13 controller untuk CRUD panel admin
    Api/User/    → (kosong/belum dipakai di project ini, ada di workspace lain)
  Http/Middleware/
    EnsureUserIsAdmin.php   → guard akses /admin & /dashboard
    HandleInertiaRequests.php
  Models/        → 15 Eloquent model
database/
  migrations/    → 20 migration
  seeders/DatabaseSeeder.php → seed data nyata (struktur kepengurusan, KKIPP, dll)
resources/js/
  Pages/Public/  → halaman React sisi publik
  Pages/Admin/   → halaman React sisi admin (index + form per resource)
  Layouts/       → PublicLayout.jsx, AdminLayout.jsx
  Components/    → komponen UI bersama (Icon, SubmitButton, dll)
routes/web.php   → seluruh routing (public + admin + auth)
```

## 4. Model Data (Eloquent)

| Model | Fungsi |
|---|---|
| `User` | Akun login (admin & pengurus dengan akun) |
| `Pengurus` | Data pengurus — dipakai untuk 2 struktur: `internal` (organisasi sendiri) & `kkipp` (struktur magang KKIPP UPI) |
| `Divisi` | Divisi internal organisasi (Internal, Eksternal, Operasional) |
| `Berita` | Artikel berita |
| `Kegiatan` | Agenda/acara |
| `Album` / `AlbumPhoto` | Galeri foto (1 album → banyak foto) |
| `Prestasi` | Daftar pencapaian organisasi |
| `Dokumen` | File transparansi (AD/ART, laporan keuangan, dll) |
| `Mitra` | Daftar mitra/kolaborator |
| `Faq` | Pertanyaan umum |
| `Pendaftar` | Data pendaftar anggota baru (form "Bergabung") |
| `Pesan` | Pesan masuk dari form kontak |
| `Setting` | Konfigurasi situs (nama, tagline, kontak, statistik, dll — disimpan sebagai kolom JSON) |
| `AuditLog` | Log aktivitas admin (audit trail) |

**Relasi penting:**
- `Divisi` 1—N `Pengurus` & `Pendaftar` (nullable, `nullOnDelete` — hapus divisi tidak menghapus data terkait)
- `Album` 1—N `AlbumPhoto` (cascade delete)
- `Pengurus` 1—1 `User` (opsional — pengurus bisa diberi akun login)

## 5. Fitur

### Sisi Publik
- Beranda, Tentang, Program, Struktur Organisasi (2 tampilan: internal & KKIPP)
- Berita (list + detail by slug)
- Kegiatan (list + detail by slug)
- Galeri album foto
- Prestasi, Transparansi (dokumen publik), Mitra, FAQ
- Pencarian (`/cari`)
- Kontak (form submit → tabel `Pesan`)
- Bergabung (form pendaftaran anggota → tabel `Pendaftar`)
- Profil Saya (untuk pengurus yang punya akun login)
- Endpoint `/ping` — query DB ringan, dipakai untuk mencegah Supabase auto-pause

### Sisi Admin (`/admin/*`, dilindungi middleware `auth` + `admin`)
CRUD penuh untuk: Berita, Struktur Pengurus (+ kelola akun login per pengurus), Divisi, Kegiatan, Album (+ upload/hapus foto per album), Prestasi, Transparansi/Dokumen, Mitra, FAQ, Pendaftar (ubah status), Pesan (tandai dibaca), Pengaturan situs.

Setiap aksi admin tercatat di `AuditLog`.

## 6. Autentikasi & Otorisasi

- Pakai sistem auth Laravel Breeze standar (session-based, bukan token API).
- Role dibedakan lewat kolom `role` di tabel `users` (default `admin`); ada method `isAdmin()` di model `User`.
- Middleware `admin` (`EnsureUserIsAdmin`) membungkus seluruh grup route `/admin/*` dan `/dashboard`.
- Pengurus biasa (non-admin) bisa diberi akun via fitur "Buat Akun Login" di admin, untuk akses halaman "Profil Saya".

## 7. Database & Infrastruktur Saat Ini

- **Database:** PostgreSQL, dihosting gratis di **Supabase** (mode pooler). Risiko: project Supabase free tier **otomatis pause setelah ~7 hari tanpa aktivitas** — sudah dimitigasi dengan route `/ping` + cron eksternal (cron-job.org) yang memanggilnya tiap hari.
- **File storage:** Disk `public` default-nya lokal (`storage/app/public`), tapi sudah disiapkan untuk pindah ke **Cloudflare R2** (S3-compatible, gratis 10GB) lewat toggle `FILESYSTEM_DISK=r2` di `.env` tanpa perlu ubah kode controller manapun.
- **Hosting aplikasi:** sedang proses deploy ke **Render** (Web Service, plan Free, berbasis Docker).

## 8. Setup Deployment (Render)

File yang sudah disiapkan di root project:
- `Dockerfile` — 3-stage build: Composer (PHP deps) → Node (build aset Vite/React) → image runtime `serversideup/php:8.3-fpm-nginx` yang otomatis menjalankan migrasi DB & `storage:link` saat container start.
- `render.yaml` — definisi Blueprint (opsional, tidak wajib dipakai untuk deploy manual).
- `.dockerignore` — mencegah `.env`, `vendor/`, `node_modules/` ikut masuk image.

**Catatan kebijakan Render terkini:** baik deploy via Blueprint maupun Web Service manual, Render mewajibkan verifikasi kartu kredit (otorisasi $1, tidak ada tagihan berulang selama instance type tetap **Free**).

## 9. Keamanan & Hal yang Perlu Diperhatikan

- ⚠️ `.env` (kredensial DB Supabase, dll) **tidak** ter-commit ke Git — sudah dicek manual saat `git init` (ada di `.gitignore`).
- ⚠️ Folder `.agents/` (skill bundle tooling lokal) sengaja dikeluarkan dari Git karena bukan bagian source code aplikasi.
- ⚠️ `BeritaController::store()` sempat punya potensi crash kalau field `image` tidak ada (`$request->file('image')->store()` dipanggil tanpa cek) — sudah diperbaiki dengan guard `hasFile()`.
- Validasi input di seluruh controller admin sudah diuji manual (request kosong/invalid direspon dengan redirect-back + pesan error, bukan crash 500).
- `AlbumController` & `DivisiController` menangani penghapusan file/relasi dengan aman (`Storage::delete` sebelum hapus record; FK `nullOnDelete` untuk relasi Divisi).

## 10. Testing yang Sudah Dilakukan

Pengujian dilakukan secara manual/live (HTTP request langsung via `curl` dengan sesi login admin sungguhan), bukan automated test suite:
- Seluruh halaman publik (200 OK, data tampil benar).
- Login admin + akses seluruh menu admin.
- CRUD penuh (create/update/delete) untuk Pengurus, Berita, Divisi, Kegiatan, Album (termasuk upload & hapus foto).
- Beberapa skenario negatif (field wajib kosong, tanggal selesai < tanggal mulai, tipe struktur tidak valid) — semua tertangani validasi, tidak ada error 500.
- Log Laravel (`storage/logs/laravel.log`) dipantau sepanjang pengujian — tidak ada error baru yang muncul.

*Belum ada automated test (PHPUnit feature test) khusus untuk fitur-fitur di atas — yang ada di `tests/` masih scaffold default Breeze (auth, profile).*

## 11. Rekomendasi Selanjutnya

1. Selesaikan migrasi file storage ke Cloudflare R2 sebelum trafik produksi besar (disk lokal Render bersifat *ephemeral*, hilang tiap redeploy).
2. Pastikan cron `/ping` aktif sebelum dan setelah deploy, supaya Supabase tidak ter-pause lagi.
3. Tambahkan automated test (Pest/PHPUnit) untuk modul-modul utama (Struktur, Berita, Pendaftar) agar regresi ke depan lebih cepat terdeteksi.
4. Pertimbangkan menambah halaman admin untuk mengelola `Setting` (statistik beranda, kontak) lebih lengkap kalau belum ada — sudah ada `PengaturanController`, perlu dicek kelengkapan field-nya.
