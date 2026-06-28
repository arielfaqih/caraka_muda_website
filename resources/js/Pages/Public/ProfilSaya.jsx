import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Icon from '@/Components/Icon';
import { initials, gradient } from '@/lib/format';

export default function ProfilSaya({ pengurus }) {
    const sub = pengurus.divisi?.name || pengurus.seksi || 'Pengurus Harian';

    return (
        <PublicLayout title="Profil Saya">
            <section className="sec"><div className="container">
                <SectionHead eyebrow="Akun Anggota" title="Profil Saya" />

                <div className="card" style={{ maxWidth: 640, display: 'flex', overflow: 'hidden' }}>
                    <div style={{ width: 200, flex: 'none', background: 'var(--paper2)', minHeight: 240 }}>
                        {pengurus.photo_url ? (
                            <img src={pengurus.photo_url} alt={pengurus.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                            <div style={{
                                width: '100%', height: '100%', minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '2.6rem', color: '#fff', background: gradient(pengurus.order || 0),
                            }}>
                                {initials(pengurus.name).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div style={{ padding: '28px 26px', flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: '1.4rem' }}>{pengurus.name}</h3>
                        <div className="role" style={{ color: 'var(--red)', fontWeight: 700, fontSize: '.92rem', marginTop: 4 }}>{pengurus.role}</div>
                        <div className="faint" style={{ fontSize: '.84rem', marginTop: 2 }}>{sub}</div>
                        <div className="faint" style={{ fontSize: '.8rem', marginTop: 2 }}>Periode {pengurus.period}</div>
                        {pengurus.bio && <p className="muted" style={{ marginTop: 16, fontSize: '.94rem' }}>{pengurus.bio}</p>}

                        {(pengurus.ig || pengurus.li) && (
                            <div className="row gap8" style={{ marginTop: 20 }}>
                                {pengurus.ig && (
                                    <a href={`https://instagram.com/${pengurus.ig}`} target="_blank" rel="noopener noreferrer" className="iconbtn" aria-label="Instagram">
                                        <Icon name="ig" />
                                    </a>
                                )}
                                {pengurus.li && (
                                    <a href={`https://linkedin.com/in/${pengurus.li}`} target="_blank" rel="noopener noreferrer" className="iconbtn" aria-label="LinkedIn">
                                        <Icon name="li" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="row gap12 wrap mt24">
                    <Link href={route('profile.edit')} className="btn btn-ghost"><Icon name="settings" /> Pengaturan Akun</Link>
                    <Link href={route('logout')} method="post" className="btn btn-outline-white" style={{ color: 'var(--ink)', border: '1.5px solid var(--line-2)' }}>
                        <Icon name="logout" /> Keluar
                    </Link>
                </div>
            </div></section>
        </PublicLayout>
    );
}
