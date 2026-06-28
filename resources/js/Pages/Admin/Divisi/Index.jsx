import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';

export default function Index({ divisi }) {
    function destroy(d) {
        if (confirm(`Hapus divisi "${d.name}"? Pengurus & pendaftar yang terkait akan jadi tanpa divisi.`)) {
            router.delete(route('admin.divisi.destroy', d.id));
        }
    }

    return (
        <AdminLayout title="Kelola Divisi">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Divisi</h1>
                    <p className="muted">Atur divisi internal yang dipakai di struktur organisasi & form pendaftaran.</p>
                </div>
                <Link href={route('admin.divisi.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Divisi</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Urutan</th><th>Ikon</th><th>Nama</th><th>Pengurus</th><th>Pendaftar</th><th></th></tr>
                    </thead>
                    <tbody>
                        {divisi.map((d) => (
                            <tr key={d.id}>
                                <td className="muted">{d.order}</td>
                                <td><Icon name={d.icon} /></td>
                                <td><b>{d.name}</b></td>
                                <td className="muted">{d.pengurus_count}</td>
                                <td className="muted">{d.pendaftars_count}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.divisi.edit', d.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(d)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!divisi.length && (
                            <tr><td colSpan={6} className="muted center" style={{ padding: 28 }}>Belum ada divisi.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
