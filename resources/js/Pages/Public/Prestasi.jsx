import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

export default function Prestasi({ prestasi }) {
    return (
        <PublicLayout title="Prestasi">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Prestasi' }]} />
                <SectionHead eyebrow="Prestasi" title="Hasil dari kerja bareng" />

                <div className="grid-2">
                    {prestasi.map((p) => (
                        <div key={p.id} className="card lift achv">
                            <div className="medal"><Icon name="award" /></div>
                            <div>
                                <div className="row gap8 wrap" style={{ alignItems: 'center' }}>
                                    <span className="yr">{p.year}</span>
                                </div>
                                <h4 style={{ margin: '8px 0 4px' }}>{p.title}</h4>
                                <p className="muted" style={{ fontSize: '.9rem' }}>{p.desc}</p>
                            </div>
                        </div>
                    ))}
                    {!prestasi.length && <p className="muted">Belum ada prestasi tercatat.</p>}
                </div>

                <div className="cta-band mt32">
                    <h2>Ingin berprestasi bareng kami?</h2>
                    <p>Pantau halaman Berita untuk pengumuman pembukaan pendaftaran anggota baru.</p>
                    <div className="hero-cta">
                        <Link href={route('berita.index')} className="btn btn-white btn-lg"><Icon name="news" /> Pantau Pengumuman</Link>
                    </div>
                </div>
            </div></section>
        </PublicLayout>
    );
}
