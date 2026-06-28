import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import { fmtDate } from '@/lib/format';

export default function Transparansi({ groups }) {
    const cats = Object.keys(groups);

    return (
        <PublicLayout title="Transparansi">
            <section className="sec"><div className="container" style={{ maxWidth: 880 }}>
                <Breadcrumb items={[{ label: 'Transparansi' }]} />
                <SectionHead eyebrow="Transparansi" title="Terbuka itu komitmen" />

                <div className="note row gap8" style={{ alignItems: 'center', marginBottom: 26 }}>
                    <Icon name="shield" /><span>Seluruh dokumen di bawah bersifat publik dan dapat diunduh tanpa biaya.</span>
                </div>

                {cats.map((cat) => (
                    <div key={cat} style={{ marginBottom: 28 }}>
                        <span className="eyebrow" style={{ marginBottom: 14, display: 'inline-block' }}>{cat}</span>
                        <div style={{ display: 'grid', gap: 12 }}>
                            {groups[cat].map((d) => (
                                <div key={d.id} className="doc-item">
                                    <div className="doc-ic"><Icon name="doc" /></div>
                                    <div className="info">
                                        <h4>{d.title}</h4>
                                        <div className="sub">PDF · {fmtDate(d.created_at)}</div>
                                    </div>
                                    <a href={d.file_url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-soft btn-sm"><Icon name="download" /> Unduh</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {!cats.length && <p className="muted">Belum ada dokumen.</p>}
            </div></section>
        </PublicLayout>
    );
}
