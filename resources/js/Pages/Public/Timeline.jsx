import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import { fmtDate } from '@/lib/format';

export default function Timeline({ timeline }) {
    return (
        <PublicLayout title="Timeline">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Timeline' }]} />
                <SectionHead eyebrow="Perjalanan Kami" title="Timeline Caraka Muda" />
                <p className="muted" style={{ marginTop: -20, marginBottom: 30, maxWidth: 640 }}>
                    Momen-momen penting dalam perjalanan Caraka Muda, dari awal berdiri hingga hari ini.
                </p>

                {!timeline.length && <p className="muted">Belum ada momen timeline.</p>}

                <div style={{ position: 'relative', paddingLeft: 28, maxWidth: 720 }}>
                    {!!timeline.length && (
                        <div style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 2, background: 'var(--line-2)' }} />
                    )}
                    {timeline.map((t) => (
                        <div key={t.id} style={{ position: 'relative', marginBottom: 32 }}>
                            <div style={{
                                position: 'absolute', left: -28, top: 4, width: 12, height: 12, borderRadius: '50%',
                                background: 'var(--red)', border: '3px solid var(--bg)', boxShadow: '0 0 0 2px var(--red)',
                            }} />
                            <div className="row gap8" style={{ alignItems: 'center', marginBottom: 4 }}>
                                <Icon name="cal" />
                                <span className="muted" style={{ fontSize: '.85rem', fontWeight: 600 }}>{fmtDate(t.date)}</span>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: 6 }}>{t.title}</h3>
                            {t.description && <p className="muted">{t.description}</p>}
                        </div>
                    ))}
                </div>
            </div></section>
        </PublicLayout>
    );
}
