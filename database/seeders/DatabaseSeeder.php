<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\AlbumPhoto;
use App\Models\AuditLog;
use App\Models\Berita;
use App\Models\Dokumen;
use App\Models\Divisi;
use App\Models\Faq;
use App\Models\Kegiatan;
use App\Models\Mitra;
use App\Models\Pendaftar;
use App\Models\Pengurus;
use App\Models\Pesan;
use App\Models\Prestasi;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Caraka',
            'email' => 'admin@carakamuda.org',
            'password' => 'caraka123',
            'role' => 'super_admin',
        ]);

        $divisi = collect([
            ['name' => 'Divisi Internal', 'icon' => 'shield', 'desc' => 'Memperkuat kaderisasi dan kekompakan anggota lewat penguatan internal organisasi.'],
            ['name' => 'Divisi Eksternal', 'icon' => 'mega', 'desc' => 'Membangun hubungan publik dan menjalin kerja sama dengan pihak luar.'],
            ['name' => 'Divisi Operasional', 'icon' => 'settings', 'desc' => 'Menaungi koordinasi 7 Seksi Magang dan menjalankan operasional harian organisasi.'],
        ])->map(fn ($d, $i) => Divisi::create([...$d, 'order' => $i]));
        $divisiByName = $divisi->keyBy('name');

        // Struktur internal: dipimpin Koordinator Utama, struktur khas organisasi pada umumnya (data resmi 2025/2026).
        $internalPeriod = '2025/2026';
        Pengurus::create(['name' => 'Ariel Hidayatul Faqih', 'role' => 'Koordinator Utama', 'struktur_type' => 'internal', 'period' => $internalPeriod, 'order' => 0]);
        Pengurus::create(['name' => 'Salsa', 'role' => 'Sekretaris 1', 'struktur_type' => 'internal', 'period' => $internalPeriod, 'order' => 1]);
        Pengurus::create(['name' => 'Candra', 'role' => 'Sekretaris 2', 'struktur_type' => 'internal', 'period' => $internalPeriod, 'order' => 2]);
        Pengurus::create(['name' => 'Ira', 'role' => 'Bendahara 1', 'struktur_type' => 'internal', 'period' => $internalPeriod, 'order' => 3]);
        Pengurus::create(['name' => 'Anma', 'role' => 'Bendahara 2', 'struktur_type' => 'internal', 'period' => $internalPeriod, 'order' => 4]);

        $kadivSeed = [
            'Divisi Internal' => [
                ['Dilla', 'Koordinator'],
            ],
            'Divisi Eksternal' => [
                ['Mita Fitri Rahmawati', 'Koordinator'],
                ['Fedora Ariefa Ardian', 'Public Relation'],
                ['Muhammad Affkha Wibisana', 'Public Relation'],
                ['Muhammad Nadhif Mahardika', 'Staf Eksternal'],
                ['Muhammad Gibran Alfajr', 'Staf Eksternal'],
            ],
            'Divisi Operasional' => [
                ['Zala', 'Koordinator'],
                ['Faisyal', 'Staf Koordinator'],
                ['Fauzan', 'Staf Koordinator'],
                ['Regina', 'Staf Koordinator'],
                ['Nopi', 'Staf Koordinator'],
                ['Hilya', 'Staf Koordinator'],
                ['Salsa', 'Staf Koordinator'],
            ],
        ];
        $order = 5;
        foreach ($kadivSeed as $divisiName => $members) {
            foreach ($members as [$name, $role]) {
                Pengurus::create([
                    'name' => $name, 'role' => $role, 'divisi_id' => $divisiByName[$divisiName]->id, 'struktur_type' => 'internal',
                    'period' => $internalPeriod, 'order' => $order++,
                ]);
            }
        }

        // Struktur 3 Seksi KKIPP UPI (data resmi), tempat Caraka Muda menjalani program magang.
        $kkippPeriod = '2025/2026';

        Pengurus::create(['name' => 'Vidi Sukmayadi, S.S., M.Si., Ph.D.', 'role' => 'Kepala KKIPP', 'struktur_type' => 'kkipp', 'period' => $kkippPeriod, 'order' => 0]);

        $seksiStaff = [
            'Seksi Informasi Publik dan Layanan Terpadu' => [
                ['Muhamad Iqbal, M.Si.', 'Kepala Seksi'],
                ['Ardi M. Noer, S.Pd., M.M.', 'Staf'],
                ['Yudhit Anatha, S.Pd.', 'Staf'],
                ['Ismi Biliarborita Tan, S.Pd.', 'Staf'],
            ],
            'Seksi Komunikasi dan Media' => [
                ['Dr. Angga Hadipurwa, S.Pd., M.I.Kom.', 'Kepala Seksi'],
                ['Deny Nurahmat, S.Pd.', 'Staf'],
                ['Cawaludin Saputra, S.Pd.', 'Staf'],
                ['Riza Ibrahim', 'Staf'],
                ['Ratih Latifah Murniati, S.I.Kom.', 'Staf'],
                ['Fachmi Maulana, S.Ikom.', 'Staf'],
                ['Ravie Syafitha Zulkifly', 'Staf'],
                ['Haydar Islami, S.Pd.', 'Staf'],
                ['Kholid Abdullah', 'Staf'],
                ['Jaka Falah, S.S., M.Pd.', 'Staf'],
                ['Rahmat Kurnia', 'Staf'],
            ],
            'Seksi Administrasi Umum dan Sumber Daya' => [
                ['Dodi Angga Nugraha, S.Sos., M.Si.', 'Kepala Seksi'],
                ['Budiawan, S.A.P.', 'Staf'],
                ['Susanti, S.E.', 'Staf'],
            ],
        ];

        $order = 1;
        foreach ($seksiStaff as $seksi => $members) {
            foreach ($members as [$name, $role]) {
                Pengurus::create([
                    'name' => $name, 'role' => $role, 'struktur_type' => 'kkipp', 'seksi' => $seksi,
                    'period' => $kkippPeriod, 'order' => $order++,
                ]);
            }
        }

        // Bidang magang -> seksi penempatan.
        $bidangToSeksi = [
            'AUSD' => 'Seksi Administrasi Umum dan Sumber Daya',
            'Layanan Terpadu' => 'Seksi Informasi Publik dan Layanan Terpadu',
            'Layanan Kunjungan' => 'Seksi Informasi Publik dan Layanan Terpadu',
            'Media Sosial' => 'Seksi Komunikasi dan Media',
            'Liputan dan Siaran Pers' => 'Seksi Komunikasi dan Media',
            'Penyiaran TV' => 'Seksi Komunikasi dan Media',
            'Penyiaran Radio' => 'Seksi Komunikasi dan Media',
        ];

        // Daftar Caraka Muda 2026: [nama, program studi, fakultas, bidang magang].
        $carakaMuda2026 = [
            ['Salsa Sabila', 'Administrasi Pendidikan', 'FIP', 'AUSD'],
            ['Masarah Nayla', 'Ilmu Hukum', 'FPIPS', 'Layanan Terpadu'],
            ['Candra Fajri', 'Pendidikan Kesejahteraan Keluarga', 'FPTI', 'Layanan Terpadu'],
            ['Zahwa Fauziah', 'Pendidikan Ekonomi', 'FPEB', 'Layanan Terpadu'],
            ['Ariel Hidayatul Faqih', 'Pendidikan Ilmu Komputer', 'FPMIPA', 'Layanan Terpadu'],
            ['Yoga Firmansyah', 'Bimbingan dan Konseling', 'FIP', 'Layanan Terpadu'],
            ['Zahra Rahmandani Aulillah', 'Pendidikan Fisika', 'FPMIPA', 'Layanan Terpadu'],
            ['Nazhifa Yasmin Nursya’bani', 'Teknologi Pendidikan', 'FIP', 'Layanan Terpadu'],
            ['Sahrul Romdhoni', 'Pendidikan Pariwisata', 'FPIPS', 'Layanan Kunjungan'],
            ['Safina Tri Maharani', 'Teknik Energi Terbarukan', 'FPTI', 'Layanan Kunjungan'],
            ['Syawaliah', 'Perpusinfo', 'FIP', 'Layanan Kunjungan'],
            ['Rizka Patmanita Rislani', 'MIK', 'FPIPS', 'Layanan Kunjungan'],
            ['Savira Noor Azizah', 'MIK', 'FPIPS', 'Layanan Kunjungan'],
            ['Sausan Nazla Nafisa', 'Perpusinfo', 'FIP', 'Layanan Kunjungan'],
            ['Fedora Ariefa Ardian', 'Ilmu Komputer', 'FPMIPA', 'Layanan Kunjungan'],
            ['Najmy Watsiqah', 'Pendidikan Tata Boga', 'FPTI', 'Layanan Kunjungan'],
            ['Zalfa Adya Pratama', 'Pendidikan PKn', 'FPIPS', 'Layanan Kunjungan'],
            ['Vivia Nasya Swara', 'Teknologi Pendidikan', 'FIP', 'Layanan Kunjungan'],
            ['Nopi Nurkhaeri', 'Ilmu Komunikasi', 'FPIPS', 'Media Sosial'],
            ['Aditia Bayu Tirta', 'Pendidikan IPS', 'FPIPS', 'Media Sosial'],
            ['Diva Aldila Sandi', 'PGSD', 'FIP', 'Media Sosial'],
            ['Icha S Agustina', 'Ilmu Komunikasi', 'FPIPS', 'Media Sosial'],
            ['Siva Aulia', 'Teknologi Pendidikan', 'FIP', 'Media Sosial'],
            ['Khansa Munifah Nur Muthmainnah', 'Ilmu Komunikasi', 'FPIPS', 'Media Sosial'],
            ['Safinatun Naja Assuffie', 'Pendidikan Kesejahteraan Keluarga', 'FPTI', 'Media Sosial'],
            ['Zahra Agreika Putri G', 'Pendidikan Matematika', 'FPMIPA', 'Media Sosial'],
            ['Syifa Salam Salsabila', 'Arsitektur', 'FPTI', 'Media Sosial'],
            ['Najla Nailah Nahdah', 'PGSD', 'FIP', 'Media Sosial'],
            ['Arzanela Riva', 'Ilmu Komunikasi', 'FPIPS', 'Liputan dan Siaran Pers'],
            ['Claudina Savira', 'Ilmu Komunikasi', 'FPIPS', 'Liputan dan Siaran Pers'],
            ['Fauzan Saeful Pattah', 'Pendidikan IPS', 'FPIPS', 'Liputan dan Siaran Pers'],
            ['Ilham Nugraha', 'Teknologi Pendidikan', 'FIP', 'Liputan dan Siaran Pers'],
            ['Velia Lisnawati', 'Pendidikan Bisnis', 'FPEB', 'Liputan dan Siaran Pers'],
            ['Rana Aliyya Nareswari', 'Teknologi Pendidikan', 'FIP', 'Liputan dan Siaran Pers'],
            ['Leli Julianti', 'Pendidikan Masyarakat', 'FIP', 'Liputan dan Siaran Pers'],
            ['Praptiningtyas', 'Ilmu Komunikasi', 'FPIPS', 'Liputan dan Siaran Pers'],
            ['Varrel Zandra Putra', 'PJKR', 'FPOK', 'Liputan dan Siaran Pers'],
            ['Naufal Dlorif E', 'Pendidikan PKn', 'FPIPS', 'Liputan dan Siaran Pers'],
            ['Adia Alilatulbariza', 'Pendidikan Geografi', 'FPIPS', 'Liputan dan Siaran Pers'],
            ['Muhamad Nadhif M', 'FTV', 'FPSD', 'Penyiaran TV'],
            ['Ghibran', 'FTV', 'FPSD', 'Penyiaran TV'],
            ['Fahrezy', 'FTV', 'FPSD', 'Penyiaran TV'],
            ['Immanuel Sinaga', 'Teknologi Pendidikan', 'FIP', 'Penyiaran TV'],
            ['Brily Shania Maharani', 'PGSD', 'FIP', 'Penyiaran TV'],
            ['Mitha Fitri Rahmawati', 'Teknologi Pendidikan', 'FIP', 'Penyiaran TV'],
            ['Regina Rasyid Althaaf', 'Pendidikan Kesejahteraan Keluarga', 'FPTI', 'Penyiaran TV'],
            ['Muthia Khairunnisa', 'Pendidikan Kesejahteraan Keluarga', 'FPTI', 'Penyiaran TV'],
            ['Fakhira Naila Sausan', 'Akuntansi', 'FPEB', 'Penyiaran TV'],
            ['Naila Nazwa Asyifa', 'Ilmu Komunikasi', 'FPIPS', 'Penyiaran TV'],
            ['Muhammad Fikri F', 'Musik', 'FPSD', 'Penyiaran Radio'],
            ['Faisyal Achmad R', 'Teknologi Pendidikan', 'FIP', 'Penyiaran Radio'],
            ['Nindah Halimatussadiyyah', 'Teknologi Pendidikan', 'FIP', 'Penyiaran Radio'],
            ['Salma Alya Fauziyah', 'Pendidikan Masyarakat', 'FIP', 'Penyiaran Radio'],
            ['Asifa Risanti', 'Pendidikan Ekonomi', 'FPEB', 'Penyiaran Radio'],
            ['Anma Risanti', 'FTV', 'FPSD', 'Penyiaran Radio'],
            ['Nayla Faumi', 'Pendidikan Bahasa dan Sastra Indonesia', 'FPBS', 'Penyiaran Radio'],
            ['Lintang Cahyani P', 'Pendidikan Masyarakat', 'FIP', 'Penyiaran Radio'],
            ['Hilya Mulyasani', 'Ilmu Komunikasi', 'FPIPS', 'Layanan Kunjungan'],
            ['Vivo Adhi Cahyo', 'Pendidikan Bahasa dan Sastra Indonesia', 'FPBS', 'Penyiaran Radio'],
            ['M Affkha Wibisana', 'Pendidikan Kesejahteraan Keluarga', 'FPTI', 'Penyiaran Radio'],
            ['Salsabila Syifa', 'Pendidikan Pkn', 'FPIPS', 'Penyiaran Radio'],
            ['Putri Awalia', 'Pendidikan Bahasa dan Sastra Indonesia', 'FPBS', 'Penyiaran Radio'],
            ['Fisca Aulia Pramesti A', 'Bahasa dan Sastra Inggris', 'FPBS', 'Penyiaran Radio'],
            ['Aulia Kurniasih C', 'Pendidikan Fisika', 'FPMIPA', 'Penyiaran Radio'],
            ['Nadya Ulya Rianto', 'PGSD', 'FIP', 'Penyiaran Radio'],
            ['M Ramadhan', 'Teknik Elektro', 'FPTI', 'Penyiaran Radio'],
            ['Nasya Lyra Alifia', 'Teknologi Pendidikan', 'FIP', 'Penyiaran Radio'],
        ];

        foreach ($carakaMuda2026 as [$name, $prodi, $fakultas, $bidang]) {
            Pengurus::create([
                'name' => $name,
                'role' => "Caraka Muda - {$bidang}",
                'struktur_type' => 'kkipp',
                'seksi' => $bidangToSeksi[$bidang],
                'period' => $kkippPeriod,
                'bio' => "{$prodi} · {$fakultas}",
                'order' => $order++,
            ]);
        }

        $body1 = "Caraka Muda kembali menunjukkan komitmennya terhadap masyarakat. Kegiatan kali ini berlangsung meriah dan penuh semangat kebersamaan dari seluruh anggota dan relawan yang terlibat.\n\nAntusiasme yang luar biasa\nSejak pagi, peserta sudah memadati lokasi. Panitia menyiapkan rangkaian acara yang dirancang agar semua kalangan bisa ikut serta dan merasakan manfaatnya secara langsung.\n\n\"Kami ingin setiap kegiatan tidak berhenti sebagai seremoni, tapi benar-benar berdampak,\" ujar ketua panitia.\n\nKe depan, Caraka Muda berkomitmen menghadirkan lebih banyak program serupa yang dekat dengan kebutuhan masyarakat. Terima kasih kepada seluruh pihak yang telah mendukung.";
        $body2 = "Sebagai organisasi kepemudaan, kami percaya bahwa transparansi adalah fondasi kepercayaan. Melalui tulisan ini, kami berbagi pandangan tentang pentingnya keterbukaan dalam berorganisasi.\n\nKeterbukaan bukan sekadar mempublikasikan laporan, melainkan budaya untuk saling mengingatkan, mendengar, dan bertanggung jawab atas setiap keputusan yang diambil bersama.\n\nLangkah kecil, dampak besar\nDimulai dari hal sederhana: agenda yang diumumkan terbuka, keuangan yang dapat ditelusuri, dan ruang aspirasi yang selalu terbuka bagi siapa pun.";

        $beritaSeed = [
            ['title' => 'Caraka Muda Gelar Bakti Sosial di Desa Sukamaju', 'cat' => 'Liputan Kegiatan', 'excerpt' => 'Lebih dari 100 warga menerima bantuan dalam kegiatan bakti sosial yang digelar akhir pekan lalu.', 'body' => $body1, 'author' => 'Tim Media', 'feat' => true, 'dAgo' => 1],
            ['title' => 'Pembukaan Open Recruitment Anggota Baru 2026', 'cat' => 'Pengumuman', 'excerpt' => 'Saatnya bergabung! Pendaftaran anggota baru resmi dibuka untuk seluruh pemuda yang ingin berkarya.', 'body' => "Caraka Muda dengan bangga membuka pendaftaran anggota baru periode 2026. Kami mengajak seluruh pemuda yang punya semangat berkontribusi untuk bergabung.\n\nKenapa harus gabung?\n- Ruang belajar kepemimpinan\n- Jejaring lintas komunitas\n- Aksi nyata yang berdampak\n\nPendaftaran dibuka melalui formulir di halaman Bergabung. Sampai jumpa di Caraka Muda!", 'author' => 'Sekretariat', 'feat' => false, 'dAgo' => 3],
            ['title' => 'Mengapa Transparansi Penting bagi Organisasi Muda', 'cat' => 'Opini', 'excerpt' => 'Sebuah refleksi tentang keterbukaan sebagai fondasi kepercayaan dalam berorganisasi.', 'body' => $body2, 'author' => 'Rangga Saputra', 'feat' => false, 'dAgo' => 6],
            ['title' => 'Caraka Muda Raih Juara Lomba Esai Kepemudaan Tingkat Provinsi', 'cat' => 'Prestasi', 'excerpt' => 'Delegasi Caraka Muda membawa pulang gelar juara dalam ajang bergengsi tingkat provinsi.', 'body' => $body1, 'author' => 'Tim Media', 'feat' => false, 'dAgo' => 12],
            ['title' => 'Penandatanganan Kerja Sama dengan Komunitas Literasi Kota', 'cat' => 'Kerja Sama', 'excerpt' => 'Kolaborasi baru untuk memperluas dampak program literasi bagi anak-anak.', 'body' => $body1, 'author' => 'Divisi Hubungan Eksternal', 'feat' => false, 'dAgo' => 18],
            ['title' => 'Workshop Desain Grafis untuk Anggota Divisi Media', 'cat' => 'Liputan Kegiatan', 'excerpt' => 'Meningkatkan kapasitas anggota lewat pelatihan desain yang seru dan aplikatif.', 'body' => $body1, 'author' => 'Divisi Media & Kreatif', 'feat' => false, 'dAgo' => 25],
        ];
        foreach ($beritaSeed as $i => $b) {
            Berita::create([
                'title' => $b['title'], 'slug' => Str::slug($b['title']), 'category' => $b['cat'],
                'excerpt' => $b['excerpt'], 'body' => $b['body'], 'author' => $b['author'],
                'featured' => $b['feat'], 'status' => 'published',
                'published_at' => now()->subDays($b['dAgo']), 'seed' => $i,
            ]);
        }

        $kegiatanSeed = [
            ['title' => 'Caraka Mengajar: Kelas Inspirasi', 'desc' => 'Berbagi ilmu dan inspirasi bersama adik-adik di sekolah dasar sekitar.', 'loc' => 'SDN 03 Sukamaju', 'dFrom' => 5, 'dur' => 0],
            ['title' => 'Diskusi Publik: Peran Pemuda di Era Digital', 'desc' => 'Ngobrol santai bareng narasumber inspiratif soal peluang & tantangan generasi muda.', 'loc' => 'Aula Serbaguna Kota', 'dFrom' => 12, 'dur' => 0],
            ['title' => 'Bersih Sungai & Tanam Pohon', 'desc' => 'Aksi peduli lingkungan bareng komunitas. Yuk jaga bumi dari hal kecil!', 'loc' => 'Bantaran Sungai Ciliwung', 'dFrom' => 20, 'dur' => 0],
            ['title' => 'Pelantikan Pengurus Periode 2025/2026', 'desc' => 'Momen resmi serah terima amanah kepengurusan baru.', 'loc' => 'Gedung Pemuda', 'dFrom' => -15, 'dur' => 0],
            ['title' => 'Malam Keakraban Anggota Baru', 'desc' => 'Bonding seru penuh tawa untuk mempererat keluarga Caraka Muda.', 'loc' => 'Villa Puncak', 'dFrom' => -30, 'dur' => 1],
        ];
        foreach ($kegiatanSeed as $i => $k) {
            Kegiatan::create([
                'title' => $k['title'], 'slug' => Str::slug($k['title']), 'description' => $k['desc'],
                'location' => $k['loc'], 'start_at' => now()->addDays($k['dFrom']),
                'end_at' => now()->addDays($k['dFrom'] + $k['dur']), 'seed' => $i,
            ]);
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
                AlbumPhoto::create(['album_id' => $album->id, 'path' => "albums/{$album->id}/{$p}.jpg", 'order' => $p]);
            }
        }

        $prestasiSeed = [
            ['title' => 'Juara 1 Lomba Esai Kepemudaan (Provinsi)', 'year' => 2026, 'desc' => 'Atas nama delegasi Caraka Muda dalam ajang kepemudaan tingkat provinsi.'],
            ['title' => 'Organisasi Kepemudaan Teraktif (Kota)', 'year' => 2025, 'desc' => 'Penghargaan dari Dinas Kepemudaan atas konsistensi program sosial.'],
            ['title' => 'Finalis Kompetisi Inovasi Sosial (Nasional)', 'year' => 2025, 'desc' => 'Masuk 10 besar nasional lewat program pemberdayaan warga.'],
            ['title' => 'Juara Harapan Video Kampanye Lingkungan (Provinsi)', 'year' => 2024, 'desc' => 'Karya Divisi Media & Kreatif dalam kampanye peduli lingkungan.'],
        ];
        foreach ($prestasiSeed as $p) {
            Prestasi::create($p);
        }

        $dokumenSeed = [
            ['title' => 'Anggaran Dasar & Anggaran Rumah Tangga (AD/ART)', 'cat' => 'Dasar Organisasi'],
            ['title' => 'Laporan Pertanggungjawaban Pengurus 2024/2025', 'cat' => 'Laporan'],
            ['title' => 'Laporan Keuangan Tahunan 2025', 'cat' => 'Laporan'],
            ['title' => 'Program Kerja Tahunan 2025/2026', 'cat' => 'Program'],
            ['title' => 'Proposal Kegiatan Caraka Mengajar', 'cat' => 'Proposal'],
        ];
        foreach ($dokumenSeed as $d) {
            Dokumen::create($d);
        }

        $mitraSeed = [
            ['name' => 'Dinas Kepemudaan Kota', 'cat' => 'Pemerintah'],
            ['name' => 'Komunitas Literasi Kota', 'cat' => 'Komunitas'],
            ['name' => 'Radio Suara Muda FM', 'cat' => 'Media'],
            ['name' => 'Koperasi Pemuda Mandiri', 'cat' => 'Sponsor'],
            ['name' => 'Universitas Nusantara', 'cat' => 'Akademik'],
            ['name' => 'Yayasan Peduli Sesama', 'cat' => 'Komunitas'],
        ];
        foreach ($mitraSeed as $m) {
            Mitra::create($m);
        }

        $faqSeed = [
            ['q' => 'Apa itu Caraka Muda?', 'a' => 'Caraka Muda adalah organisasi kepemudaan yang bergerak di bidang sosial, kreativitas, dan pengembangan kepemimpinan.'],
            ['q' => 'Siapa saja yang boleh bergabung?', 'a' => 'Semua pemuda yang punya semangat berkontribusi, tanpa memandang latar belakang.'],
            ['q' => 'Apakah ada biaya keanggotaan?', 'a' => 'Tidak ada biaya pendaftaran. Iuran anggota (jika ada) bersifat sukarela.'],
            ['q' => 'Bagaimana cara mengikuti kegiatan?', 'a' => 'Pantau halaman Kegiatan untuk agenda terbaru.'],
            ['q' => 'Di mana saya bisa melihat laporan organisasi?', 'a' => 'Seluruh dokumen publik tersedia di halaman Transparansi.'],
            ['q' => 'Bagaimana cara menjalin kerja sama?', 'a' => 'Hubungi kami melalui halaman Kontak.'],
        ];
        foreach ($faqSeed as $i => $f) {
            Faq::create([...$f, 'order' => $i]);
        }

        $pnames = ['Rizky Maulana', 'Putri Ayu', 'Fajar Nugraha', 'Sinta Bella', 'Andi Wijaya'];
        $statuses = ['baru', 'diproses', 'diterima', 'baru', 'diproses'];
        foreach ($pnames as $i => $n) {
            Pendaftar::create([
                'nama' => $n,
                'email' => Str::slug($n, '.').'@email.com',
                'whatsapp' => '08'.(1200000000 + $i * 111111),
                'institusi' => 'Universitas Nusantara',
                'divisi_id' => $divisi[$i % $divisi->count()]->id,
                'motivasi' => 'Ingin belajar berorganisasi dan berkontribusi untuk masyarakat.',
                'status' => $statuses[$i],
                'created_at' => now()->subDays($i + 1),
            ]);
        }

        Pesan::create([
            'nama' => 'Budi Santoso', 'email' => 'budi@perusahaan.co.id',
            'subjek' => 'Peluang Kerja Sama CSR',
            'pesan' => 'Halo, kami tertarik mendukung program sosial Caraka Muda. Mohon info lebih lanjut.',
            'read' => false, 'created_at' => now()->subDays(2),
        ]);

        Setting::create([
            'site_name' => 'Caraka Muda',
            'founded' => 2018,
            'tagline' => 'Pembawa pesan muda untuk perubahan nyata.',
            'recruitment_open' => true,
            'recruitment_info' => [
                'syarat' => ['Pemuda usia 16–28 tahun', 'Punya semangat berkontribusi', 'Berkomitmen mengikuti kegiatan'],
                'benefit' => ['Pelatihan kepemimpinan', 'Jejaring luas', 'Sertifikat & pengalaman nyata'],
            ],
            'contact' => [
                'address' => 'Jl. Pemuda No. 17, Kota Nusantara, Indonesia',
                'email' => 'halo@carakamuda.org',
                'whatsapp' => '0812-3456-7890',
            ],
            'stats' => [
                ['v' => '120+', 'l' => 'Anggota Aktif'],
                ['v' => '45+', 'l' => 'Kegiatan Terlaksana'],
                ['v' => '8', 'l' => 'Tahun Berkarya'],
                ['v' => '12', 'l' => 'Penghargaan'],
            ],
            'values' => [
                ['n' => 'Kolaborasi', 'd' => 'Bergerak bersama, lebih jauh dari sendiri.'],
                ['n' => 'Integritas', 'd' => 'Jujur dan konsisten dalam setiap langkah.'],
                ['n' => 'Kreativitas', 'd' => 'Berani mencari cara baru yang lebih baik.'],
                ['n' => 'Kepedulian', 'd' => 'Hadir dan dekat dengan masyarakat.'],
            ],
        ]);

        AuditLog::log('sistem', 'Laman resmi Caraka Muda diluncurkan', 'Sistem');
    }
}
