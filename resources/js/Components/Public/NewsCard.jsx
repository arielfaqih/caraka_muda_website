import { Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import { fmtDate, gradient, initials } from '@/lib/format';

export default function NewsCard({ berita, featured = false }) {
    return (
        <Link href={route('berita.show', berita.slug)} className={`card lift acard ${featured ? 'feat' : ''}`}>
            <div className="thumb">
                {berita.image_url ? (
                    <img src={berita.image_url} alt={berita.title} loading="lazy" />
                ) : (
                    <div className="ph" style={{ background: gradient(berita.seed) }}>{initials(berita.title)}</div>
                )}
                <span className="cat badge soon">{berita.category}</span>
            </div>
            <div className="body">
                <div className="meta">
                    <Icon name="cal" /> <span>{fmtDate(berita.published_at)}</span>
                    <span className="dot" /> <span>{berita.author}</span>
                </div>
                <h3>{berita.title}</h3>
                <p>{berita.excerpt}</p>
                <span className="more">Baca selengkapnya <Icon name="arrow" /></span>
            </div>
        </Link>
    );
}
