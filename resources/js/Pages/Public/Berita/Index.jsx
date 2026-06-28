import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import NewsCard from '@/Components/Public/NewsCard';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

const ALL_CATS = ['Semua', 'Pengumuman', 'Liputan Kegiatan', 'Opini', 'Prestasi', 'Kerja Sama'];

export default function Index({ berita, filters }) {
    function search(e) {
        e.preventDefault();
        const q = new FormData(e.target).get('q');
        router.get(route('berita.index'), { q, category: filters.category }, { preserveState: true });
    }

    function setCategory(c) {
        router.get(route('berita.index'), { q: filters.q, category: c === 'Semua' ? undefined : c }, { preserveState: true });
    }

    return (
        <PublicLayout title="Berita">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Berita' }]} />
                <SectionHead eyebrow="Berita & Artikel" title="Kabar terbaru dari kami" />

                <div className="row between wrap gap12" style={{ marginBottom: 26 }}>
                    <form onSubmit={search} style={{ position: 'relative', flex: 1, minWidth: 220, maxWidth: 360 }}>
                        <span style={{ position: 'absolute', left: 14, top: 12, color: 'var(--ink-faint)' }}><Icon name="search" /></span>
                        <input name="q" defaultValue={filters.q} placeholder="Cari berita…" className="input" style={{ paddingLeft: 42 }} />
                    </form>
                    <div className="row gap8 wrap">
                        {ALL_CATS.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`chip ${(filters.category || 'Semua') === c ? 'on' : ''}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {berita.data.length === 0 ? (
                    <div className="empty"><div className="em-ic"><Icon name="news" /></div><h3>Belum ada berita</h3><p className="muted">Coba ubah kata kunci atau kategori pencarianmu.</p></div>
                ) : (
                    <div className="grid-3">
                        {berita.data.map((b) => <NewsCard key={b.id} berita={b} />)}
                    </div>
                )}

                {berita.links?.length > 3 && (
                    <div className="row gap8 wrap mt32" style={{ justifyContent: 'center' }}>
                        {berita.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                className={`chip ${link.active ? 'on' : ''}`}
                                style={!link.url ? { opacity: 0.4 } : {}}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div></section>
        </PublicLayout>
    );
}
