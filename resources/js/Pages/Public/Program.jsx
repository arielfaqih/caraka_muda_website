import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

const UNGGULAN = [
    ['Caraka Mengajar', 'Berbagi ilmu ke sekolah & komunitas sekitar.', 'spark'],
    ['Bakti Sosial', 'Aksi langsung membantu masyarakat yang membutuhkan.', 'heart'],
    ['Diskusi Publik', 'Ruang bertukar gagasan soal isu kepemudaan.', 'mega'],
    ['Kaderisasi', 'Mencetak pemimpin muda lewat pelatihan berjenjang.', 'users'],
];

export default function Program({ divisi }) {
    return (
        <PublicLayout title="Program & Divisi">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Program' }]} />
                <SectionHead eyebrow="Program & Divisi" title="Lima motor penggerak Caraka" />

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
