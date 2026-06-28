import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

export default function Mitra({ groups }) {
    const cats = Object.keys(groups);

    return (
        <PublicLayout title="Mitra">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Mitra' }]} />
                <SectionHead eyebrow="Mitra & Kolaborator" title="Bergerak bareng lebih kuat" />

                {cats.map((cat) => (
                    <div key={cat} style={{ marginBottom: 28 }}>
                        <span className="eyebrow" style={{ marginBottom: 14, display: 'inline-block' }}>{cat}</span>
                        <div className="grid-4">
                            {groups[cat].map((m) => (
                                <div key={m.id} className="partner">
                                    {m.logo_url ? <img src={m.logo_url} alt={m.name} style={{ maxWidth: '100%', maxHeight: 40, objectFit: 'contain' }} /> : m.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {!cats.length && <p className="muted">Belum ada mitra.</p>}

                <div className="card pad mt16" style={{ background: 'var(--red)', color: '#fff', textAlign: 'center', padding: 40 }}>
                    <div className="feat-ic" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', margin: '0 auto 16px' }}><Icon name="heart" /></div>
                    <h3 style={{ color: '#fff', fontSize: '1.6rem' }}>Mari berkolaborasi</h3>
                    <p style={{ color: 'rgba(255,255,255,.92)', maxWidth: 480, margin: '10px auto 22px' }}>
                        Punya program atau ingin mendukung gerakan kami? Kami terbuka untuk segala bentuk kerja sama yang bermanfaat.
                    </p>
                    <Link href={route('kontak')} className="btn btn-white btn-lg"><Icon name="mail" /> Jadi Mitra</Link>
                </div>
            </div></section>
        </PublicLayout>
    );
}
