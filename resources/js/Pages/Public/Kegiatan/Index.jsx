import { Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import { fmtDate, gradient, initials } from '@/lib/format';

const FILTERS = [['semua', 'Semua'], ['soon', 'Akan Datang'], ['live', 'Berlangsung'], ['done', 'Selesai']];

function status(k) {
    const now = new Date();
    const start = new Date(k.start_at);
    const end = new Date(k.end_at);
    if (now < start) return { key: 'soon', label: 'Akan Datang', cls: 'soon' };
    if (now <= end) return { key: 'live', label: 'Berlangsung', cls: 'live' };
    return { key: 'done', label: 'Selesai', cls: 'done' };
}

export default function Index({ kegiatan }) {
    const [filter, setFilter] = useState('semua');
    const list = filter === 'semua' ? kegiatan : kegiatan.filter((k) => status(k).key === filter);

    return (
        <PublicLayout title="Kegiatan">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Kegiatan' }]} />
                <SectionHead eyebrow="Agenda & Kegiatan" title="Yang sudah & akan kami lakukan" />

                <div className="row gap8 wrap" style={{ marginBottom: 26 }}>
                    {FILTERS.map(([k, l]) => (
                        <button key={k} onClick={() => setFilter(k)} className={`chip ${filter === k ? 'on' : ''}`}>{l}</button>
                    ))}
                </div>

                {list.length === 0 ? (
                    <div className="empty"><div className="em-ic"><Icon name="cal" /></div><h3>Belum ada kegiatan</h3><p className="muted">Pantau terus untuk agenda berikutnya!</p></div>
                ) : (
                    <div className="grid-3">
                        {list.map((k) => {
                            const stat = status(k);
                            return (
                                <Link key={k.id} href={route('kegiatan.show', k.slug)} className="card lift acard">
                                    <div className="thumb">
                                        <div className="ph" style={{ background: gradient(k.seed + 2) }}>{initials(k.title)}</div>
                                        <span className={`cat badge ${stat.cls}`}>{stat.cls === 'live' && <span className="dot" />} {stat.label}</span>
                                    </div>
                                    <div className="body">
                                        <div className="meta"><Icon name="cal" /> {fmtDate(k.start_at)}</div>
                                        <h3>{k.title}</h3>
                                        <p>{k.description}</p>
                                        <div className="muted row gap6" style={{ fontSize: '.84rem', fontWeight: 600, marginTop: 10 }}><Icon name="pin" /> {k.location}</div>
                                        <span className="more">Lihat detail <Icon name="arrow" /></span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div></section>
        </PublicLayout>
    );
}
