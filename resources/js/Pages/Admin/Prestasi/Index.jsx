import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';

export default function Index({ prestasi }) {
    function destroy(p) {
        if (confirm(`Hapus prestasi "${p.title}"?`)) {
            router.delete(route('admin.prestasi.destroy', p.id));
        }
    }

    return (
        <AdminLayout title="Kelola Prestasi">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Prestasi</h1>
                    <p className="muted">Catat capaian dan penghargaan organisasi.</p>
                </div>
                <Link href={route('admin.prestasi.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Prestasi</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Judul</th><th>Tahun</th><th>Deskripsi</th><th></th></tr>
                    </thead>
                    <tbody>
                        {prestasi.data.map((p) => (
                            <tr key={p.id}>
                                <td><b>{p.title}</b></td>
                                <td className="muted">{p.year}</td>
                                <td className="muted">{p.desc}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.prestasi.edit', p.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(p)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!prestasi.data.length && (
                            <tr><td colSpan={4} className="muted center" style={{ padding: 28 }}>Belum ada prestasi.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
