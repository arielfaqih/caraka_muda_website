import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import { gradient } from '@/lib/format';

export default function GaleriAlbum({ album }) {
    const [active, setActive] = useState(null);

    return (
        <PublicLayout title={album.title}>
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Galeri', href: route('galeri') }, { label: album.title }]} />
                <SectionHead eyebrow={`Album · ${album.year}`} title={album.title} />

                {!album.photos.length && <p className="muted">Belum ada foto di album ini.</p>}

                <div className="gal-grid">
                    {album.photos.map((p, i) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => setActive(i)}
                            className="gal-item"
                            style={{ border: 'none', padding: 0 }}
                            aria-label={`Lihat foto ${i + 1}`}
                        >
                            {p.photo_url ? (
                                <img src={p.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className="ph" style={{ background: gradient(p.order || i) }}>{album.title}</div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt32">
                    <Link href={route('galeri')} className="btn btn-ghost"><Icon name="back" /> Kembali ke Galeri</Link>
                </div>
            </div></section>

            {active !== null && (
                <div
                    className="pm-overlay"
                    onClick={() => setActive(null)}
                    style={{ flexDirection: 'column' }}
                >
                    <button className="pm-close" style={{ position: 'fixed', top: 20, right: 20 }} onClick={() => setActive(null)} aria-label="Tutup">
                        <Icon name="x" />
                    </button>
                    {active > 0 && (
                        <button
                            className="iconbtn"
                            style={{ position: 'fixed', left: 20, top: '50%', background: 'rgba(255,255,255,.15)', color: '#fff' }}
                            onClick={(e) => { e.stopPropagation(); setActive(active - 1); }}
                            aria-label="Sebelumnya"
                        >
                            <Icon name="back" />
                        </button>
                    )}
                    {active < album.photos.length - 1 && (
                        <button
                            className="iconbtn"
                            style={{ position: 'fixed', right: 20, top: '50%', background: 'rgba(255,255,255,.15)', color: '#fff' }}
                            onClick={(e) => { e.stopPropagation(); setActive(active + 1); }}
                            aria-label="Berikutnya"
                        >
                            <Icon name="arrow" />
                        </button>
                    )}
                    {album.photos[active]?.photo_url ? (
                        <img
                            src={album.photos[active].photo_url}
                            alt=""
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-lg)' }}
                        />
                    ) : (
                        <div className="notice-modal" onClick={(e) => e.stopPropagation()}>
                            <p>Foto belum tersedia.</p>
                        </div>
                    )}
                </div>
            )}
        </PublicLayout>
    );
}
