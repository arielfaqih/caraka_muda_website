import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import NewsCard from '@/Components/Public/NewsCard';
import SectionHead from '@/Components/Public/SectionHead';
import Icon from '@/Components/Icon';
import { fmtDate, gradient, initials } from '@/lib/format';

export default function Show({ berita, related }) {
    return (
        <PublicLayout title={berita.title}>
            <article>
                <div className="thumb" style={{ height: 'min(46vh, 420px)', position: 'relative', background: gradient(berita.seed) }}>
                    {berita.image_url ? (
                        <img src={berita.image_url} alt={berita.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div className="ph" style={{ height: '100%', background: gradient(berita.seed), fontSize: '4rem' }}>{initials(berita.title)}</div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(126,10,20,.55))' }} />
                </div>
                <div className="container" style={{ maxWidth: 760, marginTop: -70, position: 'relative' }}>
                    <div className="card pad" style={{ padding: 34 }}>
                        <div className="breadcrumb">
                            <Link href={route('beranda')}>Beranda</Link>
                            <Icon name="chev" />
                            <Link href={route('berita.index')}>Berita</Link>
                            <Icon name="chev" />
                            <span>{berita.category}</span>
                        </div>
                        <span className="badge soon">{berita.category}</span>
                        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', margin: '14px 0' }}>{berita.title}</h1>
                        <div className="row gap16 wrap muted" style={{ fontSize: '.86rem', fontWeight: 600 }}>
                            <span>{berita.author}</span>
                            <span className="row gap6"><Icon name="cal" /> {fmtDate(berita.published_at)}</span>
                        </div>
                        <div className="divider" />
                        <div className="prose">{berita.body}</div>
                        <div className="divider" />
                        <div className="row between wrap gap12">
                            <Link href={route('berita.index')} className="btn btn-ghost btn-sm"><Icon name="back" /> Semua berita</Link>
                        </div>
                    </div>
                </div>
            </article>

            {!!related.length && (
                <section className="sec"><div className="container">
                    <SectionHead eyebrow="Baca Juga" title="Berita lainnya" />
                    <div className="grid-3">
                        {related.map((b) => <NewsCard key={b.id} berita={b} />)}
                    </div>
                </div></section>
            )}
        </PublicLayout>
    );
}
