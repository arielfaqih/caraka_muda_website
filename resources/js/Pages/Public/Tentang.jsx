import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

const SEKSI = [
    {
        nama: 'Seksi Komunikasi dan Media',
        tagline: 'Menjalin Citra, Menyuarakan Kebaikan',
        desc: 'Berperan sebagai corong informasi universitas: menyusun strategi komunikasi kelembagaan, meliput kegiatan akademik & non-akademik, serta menyebarluaskannya lewat berita, foto, dan video. Seksi ini juga menjaga reputasi lembaga lewat media sosial dan website resmi.',
        tags: ['Publikasi', 'Pencitraan'],
        icon: 'mega',
    },
    {
        nama: 'Seksi Informasi Publik dan Layanan Terpadu',
        tagline: 'Transparansi untuk Layanan yang Terpercaya',
        desc: 'Wajah keterbukaan universitas: melayani permohonan informasi publik, mengelola aspirasi & pengaduan masyarakat, serta merancang layanan terpadu yang cepat dan jelas, baik tatap muka maupun daring.',
        tags: ['Keterbukaan', 'Pelayanan'],
        icon: 'shield',
    },
    {
        nama: 'Seksi Administrasi Umum dan Sumber Daya',
        tagline: 'Menjadi penggerak di balik kelancaran operasional KKIPP melalui pengelolaan administrasi, sumber daya, dan layanan pendukung yang profesional.',
        desc: 'Berperan dalam memastikan seluruh kegiatan KKIPP berjalan secara tertib, efisien, dan berkelanjutan melalui pengelolaan administrasi, keuangan, sumber daya manusia, serta sarana dan prasarana.',
        tags: ['Administrasi', 'Efisiensi'],
        icon: 'brief',
    },
];

const BIDANG = [
    {
        seksi: 'Seksi Administrasi Umum dan Sumber Daya',
        nama: 'AUSD (Administrasi Umum dan Sumber Daya)',
        icon: 'brief',
        desc: 'Berperan dalam memastikan seluruh kegiatan KKIPP berjalan secara tertib, efisien, dan berkelanjutan melalui pengelolaan administrasi, keuangan, sumber daya manusia, serta sarana dan prasarana.',
        layanan: [
            ['Administrasi dan Kesekretariatan', 'Mengelola dokumen, surat-menyurat, arsip, dan tata kelola administrasi.'],
            ['Layanan Kepegawaian', 'Mendukung pengelolaan sumber daya manusia dan kebutuhan internal organisasi.'],
            ['Pengelolaan Keuangan', 'Membantu perencanaan, penggunaan, dan pelaporan anggaran kegiatan.'],
            ['Sarana dan Prasarana', 'Memastikan fasilitas serta kebutuhan operasional selalu siap digunakan.'],
            ['Penjaminan Mutu dan Manajemen Risiko', 'Mendukung terciptanya layanan yang profesional, transparan, dan berkelanjutan.'],
        ],
    },
    {
        seksi: 'Seksi Komunikasi dan Media',
        nama: 'Media Sosial',
        icon: 'mega',
        desc: 'Kanal komunikasi yang dikelola untuk menyebarluaskan informasi, menjaga citra, serta membangun hubungan dengan mahasiswa, staf, alumni, dan publik - memberikan info terkini tentang kegiatan kampus, prestasi mahasiswa dan dosen, serta kegiatan akademik dan non-akademik lainnya.',
        layanan: [
            ['Instagram & TikTok', 'Foto & video kegiatan kampus, konten kreatif mahasiswa, reels & tren digital, dokumentasi acara dan prestasi.'],
            ['Facebook', 'Pengumuman resmi kampus, artikel & informasi kelembagaan, publikasi kegiatan akademik dan non-akademik.'],
            ['X (Twitter)', 'Informasi singkat dan terkini, respons cepat terhadap isu & pertanyaan, komunikasi interaktif dengan audiens.'],
        ],
    },
    {
        seksi: 'Seksi Komunikasi dan Media',
        nama: 'Liputan & Siaran Pers',
        icon: 'news',
        desc: 'Bertugas meliput, mendokumentasikan, serta membuat siaran pers berbagai kegiatan dan pencapaian UPI kepada media, mencakup agenda akademik & non-akademik, kegiatan pimpinan, kerja sama institusi, penelitian inovasi, hingga prestasi sivitas akademika. Memastikan informasi resmi tersampaikan secara akurat, faktual, dan tepat waktu, sekaligus memperkuat citra dan visibilitas UPI di tingkat nasional maupun internasional.',
    },
    {
        seksi: 'Seksi Komunikasi dan Media',
        nama: 'Radio UPI',
        icon: 'phone',
        desc: 'Media penyiaran resmi UPI yang berperan menyebarluaskan informasi kampus, mendukung layanan siaran pendidikan, melestarikan budaya, serta menghadirkan hiburan yang edukatif bagi masyarakat, terutama mahasiswa UPI sendiri.',
    },
    {
        seksi: 'Seksi Komunikasi dan Media',
        nama: 'Penyiaran TV UPI',
        icon: 'yt',
        desc: 'Media audiovisual universitas yang menghadirkan konten informatif, edukatif, dan inspiratif seputar UPI, kehidupan mahasiswa, prestasi sivitas akademika, serta tren dan isu terkini, meliputi podcast, talkshow, liputan kegiatan, dan video kreatif lainnya yang relevan bagi mahasiswa UPI.',
    },
    {
        seksi: 'Seksi Informasi Publik dan Layanan Terpadu',
        nama: 'Layanan Terpadu',
        icon: 'shield',
        desc: 'Menjadi garda terdepan dalam memberikan informasi, menerima aspirasi, serta menindaklanjuti kebutuhan layanan publik di lingkungan UPI.',
        layanan: [
            ['Pelayanan Informasi Publik', null],
            ['Pengelolaan Aspirasi dan Pengaduan', null],
            ['Layanan Informasi Daring dan Luring', null],
            ['Dokumentasi dan Pengelolaan Data Layanan', null],
            ['Koordinasi Tindak Lanjut Permohonan Informasi', null],
        ],
    },
    {
        seksi: 'Seksi Informasi Publik dan Layanan Terpadu',
        nama: 'Pelayanan Kunjungan',
        icon: 'users',
        desc: 'Bertugas mengelola dan memfasilitasi berbagai kunjungan ke Universitas Pendidikan Indonesia, mulai dari studi banding, kunjungan institusi, hingga penerimaan tamu kehormatan.',
        layanan: [
            ['Penerimaan Tamu dan Mitra Institusi', null],
            ['Fasilitasi Studi Banding dan Kunjungan Edukasi', null],
            ['Pengenalan Profil dan Keunggulan UPI', null],
            ['Koordinasi Agenda dan Pendampingan Kunjungan', null],
            ['Membangun Relasi dan Kerja Sama Antar Institusi', null],
        ],
    },
];

const LAYANAN = [
    ['Peliputan dan Dokumentasi', 'Minta Liputan Kegiatan', 'Ajukan minimal 3 hari kerja sebelum acara, cantumkan narahubung. Kirim via SiNERGI-UPI, email humas@upi.edu, atau ULT.'],
    ['Pelayanan Informasi oleh ULT', 'Tanya & Lapor', 'Ajukan lewat E-Lapor ULT KKIPP, email humas@upi.edu, media sosial resmi UPI, atau datang langsung ke ULT.'],
    ['Penerbitan Rilis Pers', 'Siarkan Berita ke Media', 'KKIPP menilai urgensi berita, menyusun rilis pers maksimal 6 jam, lalu mempublikasikannya ke forum wartawan & media.'],
    ['Penerimaan Kunjungan Publik', 'Ajukan Kunjungan ke UPI', 'Surat resmi ke Kepala KKIPP UPI berisi identitas instansi, tujuan, jumlah peserta, rencana waktu, dan narahubung.'],
    ['Publikasi Konten Media Sosial & Videotron', 'Pasang Konten di Medsos/Videotron UPI', 'Ajukan minimal 14 hari sebelum tayang, sertakan identitas, tujuan, penanggungjawab, waktu tayang, file konten, dan narahubung.'],
    ['Layanan Streaming', 'Minta Siaran Langsung (Live Streaming)', 'Isi formulir permohonan streaming minimal H-7, cantumkan nama kegiatan, tanggal/waktu, lokasi, platform, dan durasi.'],
];

export default function Tentang({ settings }) {
    return (
        <PublicLayout title="Tentang">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Tentang' }]} />
                <SectionHead
                    eyebrow="Tentang Kami"
                    title="Cerita di balik Caraka Muda"
                />
                <p className="muted" style={{ fontSize: '1.05rem', marginTop: -20, marginBottom: 12, maxWidth: 640 }}>
                    {settings.tagline}
                </p>
                <p className="muted" style={{ marginBottom: 30, maxWidth: 720, textAlign: 'justify' }}>
                    <b>Caraka Muda UPI</b> adalah wadah resmi yang dibentuk oleh Kantor Komunikasi, Informasi dan Pelayanan
                    Publik (KKIPP) Universitas Pendidikan Indonesia. Organisasi ini mewadahi banyak mahasiswa pilihan yang
                    bertugas menjadi duta informasi positif, mendukung pengelolaan komunikasi publik, serta membantu relasi
                    media dan publikasi kampus.
                </p>

                <div className="grid-3" style={{ marginBottom: 32 }}>
                    <Link href={route('struktur')} className="card pad lift" style={{ cursor: 'pointer' }}>
                        <div className="feat-ic"><Icon name="users" /></div>
                        <h3>Struktur Organisasi</h3>
                        <p className="muted" style={{ fontSize: '.9rem' }}>Kenali pengurus & kepala divisi di balik Caraka Muda.</p>
                    </Link>
                    <Link href={route('kegiatan.index')} className="card pad lift" style={{ cursor: 'pointer' }}>
                        <div className="feat-ic"><Icon name="cal" /></div>
                        <h3>Kegiatan</h3>
                        <p className="muted" style={{ fontSize: '.9rem' }}>Agenda yang sudah & akan kami jalankan.</p>
                    </Link>
                    <Link href={route('program')} className="card pad lift" style={{ cursor: 'pointer' }}>
                        <div className="feat-ic"><Icon name="grid" /></div>
                        <h3>Program & Divisi</h3>
                        <p className="muted" style={{ fontSize: '.9rem' }}>Lima divisi penggerak dan program unggulan kami.</p>
                    </Link>
                </div>

                <div className="card pad" style={{ background: 'var(--red)', color: '#fff' }}>
                    <div className="eyebrow" style={{ color: '#fff' }}>Makna Nama</div>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '14px 0' }}>Caraka = Pembawa Pesan</h3>
                    <p style={{ color: 'rgba(255,255,255,.92)' }}>
                        Dalam bahasa Sanskerta &amp; Jawa, <i>caraka</i> berarti utusan atau pembawa pesan. Kami memaknainya
                        sebagai panggilan: menjadi penyambung aspirasi dan penggerak kebaikan. <b>Muda</b> adalah energinya.
                        Sejak {settings.founded}, semangat itu terus kami jaga.
                    </p>
                </div>

                {/* TENTANG KKIPP */}
                <div className="mt32">
                    <SectionHead eyebrow="Mitra Magang Kami" title="Tentang KKIPP UPI" />
                    <div className="note row gap8" style={{ alignItems: 'center', marginBottom: 22 }}>
                        <Icon name="shield" />
                        <span>Caraka Muda terhitung sebagai program magang di KKIPP, membantu keberlangsungan program kerjanya.</span>
                    </div>
                    <div className="prose" style={{ maxWidth: 'none', textAlign: 'justify' }}>
                        <p>
                            Kantor Komunikasi, Informasi dan Pelayanan Publik (<b>KKIPP</b>) adalah unit di Universitas
                            Pendidikan Indonesia yang berperan sebagai pusat komunikasi lembaga, pengelolaan informasi
                            publik, dan layanan terpadu berbasis transparansi. KKIPP tidak hanya mengurusi publikasi dan
                            hubungan masyarakat, tetapi juga memastikan informasi publik tersampaikan secara terbuka,
                            layanan masyarakat berjalan efektif, serta citra institusi terjaga melalui media resmi,
                            kampanye strategis, dan komunikasi kelembagaan.
                        </p>
                        <p>
                            KKIPP juga menjadi penghubung antara universitas dengan publik melalui pengelolaan pengaduan,
                            penyediaan informasi, serta koordinasi administrasi pendukung dengan struktur yang terdiri
                            atas Seksi Komunikasi dan Media, Seksi Informasi Publik dan Layanan Terpadu, serta Seksi
                            Administrasi Umum dan Sumber Daya.
                        </p>
                    </div>
                </div>

                {/* 3 SEKSI */}
                <div className="mt32">
                    <SectionHead eyebrow="Struktur KKIPP" title="Tiga seksi yang menjalankan KKIPP" />
                    <div className="grid-3">
                        {SEKSI.map((s) => (
                            <div key={s.nama} className="card pad feat-card lift">
                                <div className="feat-ic"><Icon name={s.icon} /></div>
                                <h3 style={{ fontSize: '1.05rem' }}>{s.nama}</h3>
                                <p className="tag" style={{ display: 'block', marginBottom: 8 }}>{s.tagline}</p>
                                <p style={{ fontSize: '.9rem', textAlign: 'justify' }}>{s.desc}</p>
                                <div className="row gap8 mt16">
                                    {s.tags.map((t) => <span key={t} className="pill red">{t}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7 BIDANG MAGANG */}
                <div className="mt32">
                    <SectionHead eyebrow="Penempatan Magang" title="Tujuh bidang yang dijalani Caraka Muda" />
                    <div className="grid-3">
                        {BIDANG.map((b) => (
                            <div key={b.nama} className="card pad feat-card lift">
                                <div className="feat-ic"><Icon name={b.icon} /></div>
                                <p className="tag" style={{ display: 'block', marginBottom: 4 }}>{b.seksi}</p>
                                <h3 style={{ fontSize: '1.05rem' }}>{b.nama}</h3>
                                <p style={{ fontSize: '.9rem', textAlign: 'justify' }}>{b.desc}</p>
                                {!!b.layanan?.length && (
                                    <ul style={{ marginTop: 12, paddingLeft: 18, fontSize: '.85rem' }}>
                                        {b.layanan.map(([l, d]) => (
                                            <li key={l} style={{ marginBottom: 4 }}>
                                                <b>{l}</b>{d ? ` - ${d}` : ''}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* LAYANAN KKIPP */}
                <div className="mt32">
                    <SectionHead eyebrow="Layanan" title="Layanan KKIPP" />
                    <div className="tbl-wrap">
                        <table className="tbl">
                            <thead>
                                <tr><th>Layanan</th><th>Tujuan</th><th>Penjelasan</th></tr>
                            </thead>
                            <tbody>
                                {LAYANAN.map(([layanan, tujuan, penjelasan]) => (
                                    <tr key={layanan}>
                                        <td><b>{layanan}</b></td>
                                        <td className="muted">{tujuan}</td>
                                        <td className="muted" style={{ fontSize: '.86rem' }}>{penjelasan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {!!settings.values?.length && (
                    <div className="mt32">
                        <SectionHead eyebrow="Nilai Kami" title="Lima hal yang kami pegang" center />
                        <div className="row wrap" style={{ justifyContent: 'center', gap: 24 }}>
                            {settings.values.map((v, i) => (
                                <div key={i} className="value" style={{ flex: '0 1 290px' }}>
                                    <div className="vn">0{i + 1}</div>
                                    <h4>{v.n}</h4>
                                    <p>{v.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="cta-band mt32">
                    <h2>Mau kenal lebih dekat?</h2>
                    <p>Lihat siapa saja orang-orang di balik Caraka Muda.</p>
                    <div className="hero-cta">
                        <Link href={route('struktur')} className="btn btn-white btn-lg"><Icon name="users" /> Lihat Struktur Pengurus</Link>
                    </div>
                </div>
            </div></section>
        </PublicLayout>
    );
}
