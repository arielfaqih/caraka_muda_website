import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import { fmtDate, gradient, initials } from '@/lib/format';

function status(k) {
    const now = new Date();
    const start = new Date(k.start_at);
    const end = new Date(k.end_at);
    if (now < start) return { key: 'soon', label: 'Akan Datang', cls: 'soon' };
    if (now <= end) return { key: 'live', label: 'Berlangsung', cls: 'live' };
    return { key: 'done', label: 'Selesai', cls: 'done' };
}

export default function Show({ kegiatan }) {
    const stat = status(kegiatan);

    return (
        <PublicLayout title={kegiatan.title}>
            <section className="sec"><div className="container" style={{ maxWidth: 820 }}>
                <Breadcrumb items={[{ label: 'Kegiatan', href: route('kegiatan.index') }, { label: kegiatan.title }]} />
                <div className="card" style={{ overflow: 'hidden' }}>
                    <div className="thumb" style={{ height: 280 }}>
                        <div className="ph" style={{ height: '100%', background: gradient(kegiatan.seed + 2), fontSize: '3rem' }}>{initials(kegiatan.title)}</div>
                    </div>
                    <div className="pad" style={{ padding: 32 }}>
                        <span className={`badge ${stat.cls}`}>{stat.cls === 'live' && <span className="dot" />} {stat.label}</span>
                        <h1 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.4rem)', margin: '14px 0' }}>{kegiatan.title}</h1>
                        <div className="grid-2" style={{ gap: 16, margin: '20px 0' }}>
                            <div className="card pad" style={{ background: 'var(--surface-2)', display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div className="feat-ic" style={{ margin: 0, width: 42, height: 42 }}><Icon name="cal" /></div>
                                <div>
                                    <div className="muted" style={{ fontSize: '.78rem', fontWeight: 700 }}>TANGGAL</div>
                                    <div style={{ fontWeight: 700 }}>{fmtDate(kegiatan.start_at)}</div>
                                </div>
                            </div>
                            <div className="card pad" style={{ background: 'var(--surface-2)', display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div className="feat-ic" style={{ margin: 0, width: 42, height: 42 }}><Icon name="pin" /></div>
                                <div>
                                    <div className="muted" style={{ fontSize: '.78rem', fontWeight: 700 }}>LOKASI</div>
                                    <div style={{ fontWeight: 700 }}>{kegiatan.location}</div>
                                </div>
                            </div>
                        </div>
                        <div className="prose" style={{ maxWidth: 'none' }}>{kegiatan.description}</div>
                        {stat.key !== 'done' && (
                            <div className="note row gap8 mt24" style={{ alignItems: 'center' }}>
                                <Icon name="info" /> <span>Kegiatan ini terbuka untuk umum.</span>
                                <Link href={route('bergabung')} className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}><Icon name="join" /> Ikut Daftar</Link>
                            </div>
                        )}
                        <div className="divider" />
                        <Link href={route('kegiatan.index')} className="btn btn-ghost btn-sm"><Icon name="back" /> Semua kegiatan</Link>
                    </div>
                </div>
            </div></section>
        </PublicLayout>
    );
}
