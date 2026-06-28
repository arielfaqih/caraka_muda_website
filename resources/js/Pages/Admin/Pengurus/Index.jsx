import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';

export default function Index({ pengurus, filters }) {
    function destroy(p) {
        if (confirm(`Hapus pengurus "${p.name}"?`)) {
            router.delete(route('admin.pengurus.destroy', p.id));
        }
    }

    function filter(key, value) {
        router.get(route('admin.pengurus.index'), { ...filters, [key]: value || undefined }, { preserveState: true });
    }

    return (
        <AdminLayout title="Kelola Struktur">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Struktur</h1>
                    <p className="muted">Atur pengurus internal & struktur KKIPP, termasuk foto profil.</p>
                </div>
                <Link href={route('admin.pengurus.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Pengurus</Link>
            </div>

            <div className="row gap12 wrap" style={{ marginBottom: 18 }}>
                <input
                    className="input" style={{ maxWidth: 240 }} placeholder="Cari nama..."
                    defaultValue={filters.search || ''}
                    onChange={(e) => filter('search', e.target.value)}
                />
                <select className="select" style={{ maxWidth: 200 }} defaultValue={filters.struktur_type || ''} onChange={(e) => filter('struktur_type', e.target.value)}>
                    <option value="">Semua Struktur</option>
                    <option value="internal">Internal</option>
                    <option value="kkipp">KKIPP</option>
                </select>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Foto</th><th>Nama</th><th>Role</th><th>Struktur</th><th>Periode</th><th>Akun</th><th></th></tr>
                    </thead>
                    <tbody>
                        {pengurus.data.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 10, flex: 'none',
                                        background: p.photo_url ? `center/cover no-repeat url(${p.photo_url})` : 'var(--paper2)',
                                        border: '1.5px solid var(--line-2)',
                                    }} />
                                </td>
                                <td><b>{p.name}</b></td>
                                <td className="muted">{p.role}{p.divisi ? ` · ${p.divisi.name}` : ''}{p.seksi ? ` · ${p.seksi}` : ''}</td>
                                <td><span className="badge done">{p.struktur_type}</span></td>
                                <td className="muted">{p.period}</td>
                                <td>{p.user ? <span className="badge done">punya akun</span> : <span className="faint">—</span>}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.pengurus.edit', p.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(p)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!pengurus.data.length && (
                            <tr><td colSpan={7} className="muted center" style={{ padding: 28 }}>Belum ada pengurus.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
