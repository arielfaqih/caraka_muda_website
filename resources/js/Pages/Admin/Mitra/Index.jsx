import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';

export default function Index({ mitra }) {
    function destroy(m) {
        if (confirm(`Hapus mitra "${m.name}"?`)) {
            router.delete(route('admin.mitra.destroy', m.id));
        }
    }

    return (
        <AdminLayout title="Kelola Mitra">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Mitra</h1>
                    <p className="muted">Atur daftar mitra & kolaborator yang tampil di halaman publik.</p>
                </div>
                <Link href={route('admin.mitra.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Mitra</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Logo</th><th>Nama</th><th>Kategori</th><th></th></tr>
                    </thead>
                    <tbody>
                        {mitra.data.map((m) => (
                            <tr key={m.id}>
                                <td>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 10, flex: 'none',
                                        background: m.logo_url ? `center/contain no-repeat url(${m.logo_url})` : 'var(--paper2)',
                                        border: '1.5px solid var(--line-2)',
                                    }} />
                                </td>
                                <td><b>{m.name}</b></td>
                                <td className="muted">{m.cat}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.mitra.edit', m.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(m)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!mitra.data.length && (
                            <tr><td colSpan={4} className="muted center" style={{ padding: 28 }}>Belum ada mitra.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
