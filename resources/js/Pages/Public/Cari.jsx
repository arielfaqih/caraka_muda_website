import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Icon from '@/Components/Icon';

export default function Cari({ q, results }) {
    function search(e) {
        e.preventDefault();
        const value = new FormData(e.target).get('q');
        router.get(route('cari'), { q: value }, { preserveState: true });
    }

    return (
        <PublicLayout title="Cari">
            <section className="sec"><div className="container" style={{ maxWidth: 720 }}>
                <SectionHead eyebrow="Pencarian" title="Cari apa pun di sini" />
                <form onSubmit={search} style={{ position: 'relative', marginBottom: 26 }}>
                    <span style={{ position: 'absolute', left: 16, top: 15, color: 'var(--ink-faint)' }}><Icon name="search" /></span>
                    <input
                        name="q"
                        defaultValue={q}
                        autoFocus
                        placeholder="Ketik kata kunci…"
                        className="input"
                        style={{ padding: '14px 16px 14px 46px', fontSize: '1.1rem' }}
                    />
                </form>

                {q ? (
                    results.length ? (
                        <div style={{ display: 'grid', gap: 12 }}>
                            {results.map((r, i) => (
                                <Link key={i} href={`/${r.nav}`} className="card pad doc-item" style={{ cursor: 'pointer' }}>
                                    <div className="info"><h4>{r.t}</h4><div className="sub">{r.d}</div></div>
                                    <Icon name="arrow" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="empty"><div className="em-ic"><Icon name="search" /></div><h3>Tidak ada hasil</h3><p className="muted">Coba kata kunci lain.</p></div>
                    )
                ) : (
                    <p className="muted center">Mulai ketik untuk mencari berita, kegiatan, dokumen, atau FAQ.</p>
                )}
            </div></section>
        </PublicLayout>
    );
}
