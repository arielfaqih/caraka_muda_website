import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

const UNGGULAN = [
    ['Peliputan dan Dokumentasi', 'Meliput serta mendokumentasikan kegiatan akademik & non-akademik UPI.', 'news'],
    ['Pelayanan Informasi oleh ULT', 'Menerima pertanyaan, aspirasi, dan pengaduan publik soal UPI.', 'shield'],
    ['Penerbitan Rilis Pers', 'Menyusun & menyebarluaskan siaran pers ke media.', 'mega'],
    ['Penerimaan Kunjungan Publik', 'Memfasilitasi kunjungan institusi & studi banding ke UPI.', 'users'],
    ['Publikasi Media Sosial & Videotron', 'Mengelola konten medsos dan videotron resmi UPI.', 'image'],
    ['Layanan Streaming', 'Menyiarkan kegiatan secara live streaming.', 'yt'],
];

export default function Program({ divisi }) {
    return (
        <PublicLayout title="Program & Divisi">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Program' }]} />
                <SectionHead eyebrow="Program & Divisi" title="Tiga motor penggerak Caraka" />

                <div className="grid-3">
                    {divisi.map((d, i) => (
                        <div key={d.id} className="card pad feat-card lift">
                            <span className="knum">0{i + 1}</span>
                            <div className="feat-ic"><Icon name={d.icon} /></div>
                            <h3>{d.name}</h3>
                            <p>{d.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="card pad mt32" style={{ background: 'var(--surface-2)' }}>
                    <SectionHead eyebrow="Program Unggulan" title="Yang rutin kami jalankan" />
                    <div className="grid-2" style={{ gap: 16 }}>
                        {UNGGULAN.map(([t, d, ic]) => (
                            <div key={t} className="card pad" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div className="feat-ic" style={{ margin: 0, width: 46, height: 46, flex: 'none' }}><Icon name={ic} /></div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px' }}>{t}</h3>
                                    <p className="muted" style={{ fontSize: '.9rem', margin: 0 }}>{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div></section>
        </PublicLayout>
    );
}
