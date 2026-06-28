import { Head, Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/Icon';

const TABS = [
    ['dashboard', 'Dashboard', 'dash', route('admin.dashboard')],
    ['berita', 'Kelola Berita', 'news', route('admin.berita.index')],
    ['pengurus', 'Kelola Struktur', 'users', route('admin.pengurus.index')],
    ['divisi', 'Kelola Divisi', 'grid', route('admin.divisi.index')],
    ['kegiatan', 'Kelola Kegiatan', 'cal', route('admin.kegiatan.index')],
    ['album', 'Kelola Galeri', 'image', route('admin.album.index')],
    ['prestasi', 'Kelola Prestasi', 'award', route('admin.prestasi.index')],
    ['dokumen', 'Kelola Transparansi', 'doc', route('admin.dokumen.index')],
    ['mitra', 'Kelola Mitra', 'heart', route('admin.mitra.index')],
    ['faq', 'Kelola FAQ', 'help', route('admin.faq.index')],
    ['pendaftar', 'Pendaftar', 'join', route('admin.pendaftar.index')],
    ['pesan', 'Pesan Masuk', 'inbox', route('admin.pesan.index')],
    ['pengaturan', 'Pengaturan', 'settings', route('admin.pengaturan.edit')],
];

export default function AdminLayout({ title, children }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();
    const path = url.split('?')[0];

    return (
        <>
            <Head title={`${title} · Admin`} />
            <div className="admin">
                <aside className="side">
                    <div className="side-brand">
                        <div className="brand-mark"><Icon name="logo" /></div>
                        <div className="brand-name">Caraka<span style={{ color: '#fff' }}>Muda</span></div>
                    </div>
                    <div className="side-t">Menu</div>
                    {TABS.map(([key, label, icon, href]) => (
                        <Link key={key} href={href} className={`side-link ${path === new URL(href).pathname ? 'on' : ''}`}>
                            <Icon name={icon} /><span>{label}</span>
                        </Link>
                    ))}
                    <div className="side-t">Akun</div>
                    <Link href={route('beranda')} className="side-link"><Icon name="back" /><span>Lihat Situs</span></Link>
                    <Link href={route('logout')} method="post" className="side-link"><Icon name="logout" /><span>Keluar</span></Link>
                    <div style={{ padding: '16px 12px', marginTop: 20, fontSize: '.74rem', color: 'rgba(255,255,255,.4)' }}>
                        Masuk sebagai<br /><b style={{ color: '#fff' }}>{auth.user?.name}</b>
                    </div>
                </aside>
                <div className="admin-main">
                    {flash?.success && <div className="note mt8" style={{ marginBottom: 22 }}>{flash.success}</div>}
                    <div key={url} className="page-enter">{children}</div>
                </div>
            </div>
        </>
    );
}
