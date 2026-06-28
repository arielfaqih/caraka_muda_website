import { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import { initials, gradient } from '@/lib/format';

function PersonCard({ p, i, sub, onOpen }) {
    return (
        <div className="card lift person" onClick={() => onOpen(p, sub)} role="button" tabIndex={0}>
            <div className="ph" style={{ background: gradient((p.order || 0) + i) }}>
                {p.photo_url ? <img src={p.photo_url} alt={p.name} /> : initials(p.name).toUpperCase()}
            </div>
            <h3>{p.name}</h3>
            <div className="role">{p.role}</div>
            <div className="div">{sub || 'Pengurus Harian'}</div>
        </div>
    );
}

function ProfileModal({ person, sub, onClose }) {
    if (!person) return null;
    return (
        <div className="pm-overlay" onClick={onClose}>
            <div className="pm-panel" onClick={(e) => e.stopPropagation()}>
                <button className="pm-close" onClick={onClose} aria-label="Tutup"><Icon name="x" /></button>
                <div className="pm-photo">
                    {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} />
                    ) : (
                        <div className="ph-fallback" style={{ background: gradient(person.order || 0) }}>
                            {initials(person.name).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="pm-body">
                    <h3>{person.name}</h3>
                    <div className="role">{person.role}</div>
                    <div className="div">{sub || 'Pengurus Harian'}</div>
                    {person.bio && <p className="bio">{person.bio}</p>}
                    {(person.ig || person.li) && (
                        <div className="socials">
                            {person.ig && (
                                <a href={`https://instagram.com/${person.ig}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Icon name="ig" />
                                </a>
                            )}
                            {person.li && (
                                <a href={`https://linkedin.com/in/${person.li}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Icon name="li" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Struktur({ periods, period, internal, kkipp }) {
    const [view, setView] = useState('internal');
    const [selected, setSelected] = useState(null);
    const seksiNames = Object.keys(kkipp.seksi);

    function openProfile(p, sub) {
        setSelected({ person: p, sub });
    }

    return (
        <PublicLayout title="Struktur Organisasi">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Tentang', href: route('tentang') }, { label: 'Struktur' }]} />
                <div className="row between wrap gap16">
                    <SectionHead eyebrow="Kepengurusan" title="Orang-orang di balik Caraka" />
                    {periods.length > 1 && (
                        <select
                            className="select"
                            style={{ maxWidth: 180 }}
                            value={period}
                            onChange={(e) => router.get(route('struktur', { period: e.target.value }))}
                        >
                            {periods.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                    )}
                </div>

                <div className="row gap8 wrap" style={{ marginBottom: 28 }}>
                    <button className={`chip ${view === 'internal' ? 'on' : ''}`} onClick={() => setView('internal')}>Struktur Internal</button>
                    <button className={`chip ${view === 'kkipp' ? 'on' : ''}`} onClick={() => setView('kkipp')}>Struktur 3 Seksi (KKIPP)</button>
                </div>

                {view === 'internal' ? (
                    <>
                        <p className="muted" style={{ marginTop: -8, marginBottom: 26, maxWidth: 640 }}>
                            Struktur internal Caraka Muda dipimpin oleh Koordinator Utama, dengan susunan kepengurusan
                            seperti organisasi pada umumnya.
                        </p>
                        <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-block' }}>Pengurus Harian</span>
                        <div className="grid-4">
                            {internal.inti.map((p, i) => <PersonCard key={p.id} p={p} i={i} onOpen={openProfile} />)}
                        </div>

                        <div className="mt32">
                            <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-block' }}>Kepala Divisi</span>
                            <div className="grid-4">
                                {internal.kadiv.map((p, i) => <PersonCard key={p.id} p={p} i={i} sub={p.divisi?.name} onOpen={openProfile} />)}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="muted" style={{ marginTop: -8, marginBottom: 26, maxWidth: 640 }}>
                            Sebagai program magang di KKIPP Universitas Pendidikan Indonesia, Caraka Muda turut mengikuti
                            pola 3 Seksi KKIPP: Komunikasi dan Media, Informasi Publik dan Layanan Terpadu, serta
                            Administrasi Umum dan Sumber Daya.
                        </p>
                        {!!kkipp.koordinator.length && (
                            <>
                                <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-block' }}>Koordinator</span>
                                <div className="grid-4" style={{ marginBottom: 32 }}>
                                    {kkipp.koordinator.map((p, i) => <PersonCard key={p.id} p={p} i={i} sub="Koordinator Magang" onOpen={openProfile} />)}
                                </div>
                            </>
                        )}
                        {seksiNames.map((seksi) => (
                            <div key={seksi} className="mt32" style={{ marginTop: seksi === seksiNames[0] ? 0 : 32 }}>
                                <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-block' }}>{seksi}</span>
                                <div className="grid-4">
                                    {kkipp.seksi[seksi].map((p, i) => <PersonCard key={p.id} p={p} i={i} sub={seksi} onOpen={openProfile} />)}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div></section>
            <ProfileModal person={selected?.person} sub={selected?.sub} onClose={() => setSelected(null)} />
        </PublicLayout>
    );
}
