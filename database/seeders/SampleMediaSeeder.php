<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\AlbumPhoto;
use Illuminate\Database\Seeder;

class SampleMediaSeeder extends Seeder
{
    public function run(): void
    {
        // Skip if already seeded (idempotent).
        if (Album::exists()) {
            $this->command->info('SampleMediaSeeder: album sudah ada, dilewati.');
            return;
        }

        $albumSeed = [
            ['title' => 'Bakti Sosial Desa Sukamaju', 'year' => 2026, 'photos' => 6],
            ['title' => 'Pelantikan Pengurus 2025/2026', 'year' => 2025, 'photos' => 5],
            ['title' => 'Malam Keakraban Anggota', 'year' => 2025, 'photos' => 8],
            ['title' => 'Diskusi Publik Pemuda Digital', 'year' => 2026, 'photos' => 4],
            ['title' => 'Aksi Bersih Lingkungan', 'year' => 2026, 'photos' => 7],
            ['title' => 'Workshop Kreatif Divisi Media', 'year' => 2026, 'photos' => 3],
        ];

        foreach ($albumSeed as $i => $a) {
            $album = Album::create(['title' => $a['title'], 'year' => $a['year'], 'seed' => $i]);
            for ($p = 0; $p < $a['photos']; $p++) {
                AlbumPhoto::create([
                    'album_id' => $album->id,
                    'path' => "albums/{$album->id}/{$p}.jpg",
                    'order' => $p,
                ]);
            }
        }
    }
}
