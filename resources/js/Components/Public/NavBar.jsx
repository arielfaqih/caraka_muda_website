import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '@/Components/Icon';

const NAV = [
    ['beranda', 'Beranda', route('beranda')],
    ['berita', 'Berita', route('berita.index')],
    ['galeri', 'Galeri', route('galeri')],
];

const TENTANG_SUB = [
    ['tentang', 'Tentang Kami', route('tentang'), 'info'],
    ['struktur', 'Struktur Organisasi', route('struktur'), 'users'],
    ['kegiatan', 'Kegiatan', route('kegiatan.index'), 'cal'],
    ['program', 'Program', route('program'), 'grid'],
];

const MORE = [
    ['timeline', 'Timeline', route('timeline'), 'pin'],
    ['prestasi', 'Prestasi', route('prestasi'), 'award'],
    ['transparansi', 'Transparansi', route('transparansi'), 'doc'],
    ['mitra', 'Mitra', route('mitra'), 'heart'],
    ['faq', 'FAQ', route('faq'), 'help'],
    ['kontak', 'Kontak', route('kontak'), 'mail'],
];

export default function NavBar() {
    const { url, props } = usePage();
    const [open, setOpen] = useState(false);
    const path = url.split('?')[0];
    const tentangOn = TENTANG_SUB.some(([, , href]) => path === new URL(href).pathname);
    const user = props.auth?.user;
    const accountHref = user ? (user.role === 'admin' || user.role === 'super_admin' ? route('admin.dashboard') : route('profil-saya')) : null;
    const accountLabel = user ? (user.role === 'admin' || user.role === 'super_admin' ? 'Dashboard' : 'Profil Saya') : null;

    return (
        <header className="nav">
            <div className="container nav-inner">
                <Link href={route('beranda')} className="brand">
                    <div className="brand-mark"><Icon name="logo" /></div>
                    <div>
                        <div className="brand-name">Caraka<span>Muda</span></div>
                        <div className="brand-sub">PEMBAWA PESAN MUDA</div>
                    </div>
                </Link>

                <nav className="nav-links">
                    <Link href={route('beranda')} className={`nav-link ${path === '/' ? 'on' : ''}`}>Beranda</Link>

                    <div className="has-sub">
                        <a className={`nav-link ${tentangOn ? 'on' : ''}`}>Tentang <Icon name="chevd" /></a>
                        <div className="subm">
                            {TENTANG_SUB.map(([key, label, href, icon]) => (
                                <Link key={key} href={href}>
                                    <Icon name={icon} /> {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href={route('berita.index')} className={`nav-link ${path === new URL(route('berita.index')).pathname ? 'on' : ''}`}>Berita</Link>
                    <Link href={route('galeri')} className={`nav-link ${path === new URL(route('galeri')).pathname ? 'on' : ''}`}>Galeri</Link>

                    <div className="has-sub">
                        <a className="nav-link">Lainnya <Icon name="chevd" /></a>
                        <div className="subm">
                            {MORE.map(([key, label, href, icon]) => (
                                <Link key={key} href={href}>
                                    <Icon name={icon} /> {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="nav-actions">
                    <Link href={route('cari')} className="iconbtn desk-only" aria-label="Cari">
                        <Icon name="search" />
                    </Link>
                    {accountHref && (
                        <Link href={accountHref} className="btn btn-primary btn-sm desk-only">
                            <Icon name="users" /> {accountLabel}
                        </Link>
                    )}
                    <button className="iconbtn menu-btn" aria-label="Menu" onClick={() => setOpen(true)}>
                        <Icon name="menu" />
                    </button>
                </div>
            </div>

            <div className={`drawer-bg ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
            <aside className={`drawer ${open ? 'open' : ''}`}>
                <div className="drawer-head">
                    <div className="brand">
                        <div className="brand-mark"><Icon name="logo" /></div>
                        <div className="brand-name">Caraka<span>Muda</span></div>
                    </div>
                    <button className="iconbtn" onClick={() => setOpen(false)}><Icon name="x" /></button>
                </div>
                <div className="drawer-body">
                    {[
                        ['beranda', 'Beranda', route('beranda'), 'home'],
                        ...TENTANG_SUB,
                        ['berita', 'Berita', route('berita.index'), 'news'],
                        ['galeri', 'Galeri', route('galeri'), 'image'],
                        ...MORE,
                    ].map(([key, label, href, icon]) => (
                        <Link
                            key={key}
                            href={href}
                            className={`drawer-link ${path === new URL(href).pathname ? 'on' : ''}`}
                            onClick={() => setOpen(false)}
                        >
                            {icon && <Icon name={icon} />} {label}
                        </Link>
                    ))}
                </div>
                {accountHref && (
                    <div className="drawer-foot">
                        <Link href={accountHref} className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                            <Icon name="users" /> {accountLabel}
                        </Link>
                    </div>
                )}
            </aside>
        </header>
    );
}
