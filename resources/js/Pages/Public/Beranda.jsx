import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import NewsCard from '@/Components/Public/NewsCard';
import Icon from '@/Components/Icon';
import { gradient } from '@/lib/format';

export default function Beranda({ settings, featured, latestNews, divisi, albums, mitra }) {
    const stats = settings.stats?.length ? settings.stats : [];

    return (
        <PublicLayout title="Beranda">
            {/* HERO */}
            <section className="hero">
                <div className="hero-deco"><div className="blob b1" /><div className="blob b2" /></div>
                <div className="hero-stripes" />
                <div className="container hero-inner">
                    <div className="reveal in">
                        <span className="hero-tagpill"><span className="dot" /> Organisasi Kepemudaan · Sejak {settings.founded}</span>
                        <h1>Pembawa Pesan,<br /><span className="out">Penggerak</span> Perubahan.</h1>
                        <p className="hero-lede">
                            {settings.tagline} Tempat anak muda berkumpul, belajar, dan bergerak menciptakan dampak nyata bagi sekitar.
                        </p>
                        <div className="hero-cta">
                            <Link href={route('tentang')} className="btn btn-white btn-lg">Kenali Kami <Icon name="arrow" /></Link>
                            <Link href={route('login')} className="btn btn-outline-white btn-lg"><Icon name="logout" /> Masuk</Link>
                        </div>
                        <div className="hero-trust">
                            <span className="row"><Icon name="shield" /> Transparan & terbuka</span>
                            <span className="row"><Icon name="heart" /> Aksi nyata</span>
                            <span className="row"><Icon name="users" /> {stats[0]?.v || '120+'} anggota</span>
                        </div>
                    </div>
                    {!!stats.length && (
                        <div className="hero-art reveal in">
                            <div className="hero-card">
                                <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '.8rem', letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 6 }}>
                                    Caraka dalam Angka
                                </div>
                                {stats.map((s, i) => (
                                    <div key={i} className="hc-stat">
                                        <div className="hc-num">{s.v}</div>
                                        <div className="hc-lab">{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,40 C360,80 720,0 1080,30 C1260,45 1380,55 1440,50 L1440,70 L0,70 Z" />
                </svg>
            </section>

            {/* STATS STRIP */}
            {!!stats.length && (
                <section className="sec-sm"><div className="container">
                    <div className="stats-strip">
                        {stats.map((s, i) => (
                            <div key={i} className="stat reveal"><div className="num">{s.v}</div><div className="lab">{s.l}</div></div>
                        ))}
                    </div>
                </div></section>
            )}

            {/* TENTANG SINGKAT */}
            <section className="sec alt"><div className="container">
                <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
                    <div className="reveal">
                        <SectionHead eyebrow="Tentang Kami" title={<>Kami percaya pemuda<br />adalah pembawa perubahan</>} />
                        <p className="muted" style={{ fontSize: '1.05rem', marginTop: -20 }}>
                            Caraka Muda adalah rumah bagi anak muda yang ingin berbuat lebih. Dari diskusi hangat sampai aksi
                            nyata di lapangan — semua dimulai dari niat baik dan kerja bareng.
                        </p>
                        <div className="row gap12 wrap mt24">
                            <Link href={route('tentang')} className="btn btn-primary">Cerita Lengkap <Icon name="arrow" /></Link>
                            <Link href={route('struktur')} className="btn btn-ghost"><Icon name="users" /> Lihat Pengurus</Link>
                        </div>
                    </div>
                    <div className="grid-2 reveal" style={{ gap: 16 }}>
                        {(settings.values || []).slice(0, 4).map((v, i) => (
                            <div key={i} className="value">
                                <div className="vn">0{i + 1}</div>
                                <h4>{v.n}</h4>
                                <p>{v.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div></section>

            {/* BERITA TERBARU */}
            <section className="sec"><div className="container">
                <div className="row between wrap gap16">
                    <SectionHead eyebrow="Kabar Terbaru" title="Apa yang sedang terjadi" />
                    <Link href={route('berita.index')} className="btn btn-ghost btn-sm reveal">Semua berita <Icon name="arrow" /></Link>
                </div>
                <div className="grid-3 reveal">
                    {featured && <NewsCard berita={featured} featured />}
                    {latestNews.map((b) => <NewsCard key={b.id} berita={b} />)}
                </div>
            </div></section>

            {/* DIVISI */}
            <section className="sec alt"><div className="container">
                <div className="reveal">
                    <SectionHead eyebrow="Lima Divisi" title="Tempatmu berkarya" />
                    <div className="grid-3" style={{ gap: 12 }}>
                        {divisi.map((d) => (
                            <Link key={d.id} href={route('program')} className="card pad lift" style={{ display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer' }}>
                                <div className="feat-ic" style={{ margin: 0, width: 46, height: 46 }}><Icon name={d.icon} /></div>
                                <div>
                                    <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{d.name}</h3>
                                    <p className="muted" style={{ fontSize: '.86rem', margin: 0 }}>{d.desc?.slice(0, 62)}…</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div></section>

            {/* GALERI */}
            <section className="sec"><div className="container">
                <div className="row between wrap gap16">
                    <SectionHead eyebrow="Galeri" title="Momen-momen Caraka" />
                    <Link href={route('galeri')} className="btn btn-ghost btn-sm reveal">Buka galeri <Icon name="arrow" /></Link>
                </div>
                <div className="gal-grid reveal">
                    {albums.map((a) => (
                        <div key={a.id} className="gal-item">
                            <div className="ph" style={{ background: gradient(a.seed) }}>{a.title}</div>
                            <span className="count">{a.photos_count} foto</span>
                            <div className="ov"><b>{a.title}</b><span>{a.year}</span></div>
                        </div>
                    ))}
                </div>
            </div></section>

            {/* CTA */}
            <section className="sec-sm"><div className="container">
                <div className="cta-band reveal">
                    <h2>Siap jadi bagian dari perubahan?</h2>
                    <p>Pendaftaran anggota baru tidak selalu dibuka — pantau halaman Berita untuk pengumuman pembukaannya.</p>
                    <div className="hero-cta">
                        <Link href={route('berita.index')} className="btn btn-white btn-lg">
                            <Icon name="news" /> Pantau Pengumuman
                        </Link>
                        <Link href={route('kontak')} className="btn btn-outline-white btn-lg">Hubungi Kami</Link>
                    </div>
                </div>
            </div></section>

            {/* MITRA */}
            {!!mitra.length && (
                <section className="sec-sm"><div className="container">
                    <SectionHead eyebrow="Didukung Oleh" title="Mitra & kolaborator kami" center />
                    <div className="grid-4 reveal">
                        {mitra.map((m) => <div key={m.id} className="partner">{m.name}</div>)}
                    </div>
                </div></section>
            )}
        </PublicLayout>
    );
}
