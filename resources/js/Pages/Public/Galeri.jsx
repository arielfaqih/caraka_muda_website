import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { gradient } from '@/lib/format';

export default function Galeri({ albums }) {
    return (
        <PublicLayout title="Galeri">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Galeri' }]} />
                <SectionHead eyebrow="Galeri" title="Cerita dalam bingkai" />
                <div className="gal-grid">
                    {albums.map((a) => (
                        <div key={a.id} className="gal-item">
                            <div className="ph" style={{ background: gradient(a.seed) }}>{a.title}</div>
                            <span className="count">{a.photos_count} foto</span>
                            <div className="ov"><b>{a.title}</b><span>{a.year}</span></div>
                        </div>
                    ))}
                    {!albums.length && <p className="muted">Belum ada album.</p>}
                </div>
            </div></section>
        </PublicLayout>
    );
}
