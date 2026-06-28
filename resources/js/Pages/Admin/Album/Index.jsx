import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';

export default function Index({ album }) {
    function destroy(a) {
        if (confirm(`Hapus album "${a.title}" beserta semua fotonya?`)) {
            router.delete(route('admin.album.destroy', a.id));
        }
    }

    return (
        <AdminLayout title="Kelola Galeri">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Galeri</h1>
                    <p className="muted">Atur album & foto yang tampil di halaman Galeri.</p>
                </div>
                <Link href={route('admin.album.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Album</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Judul</th><th>Tahun</th><th>Jumlah Foto</th><th></th></tr>
                    </thead>
                    <tbody>
                        {album.data.map((a) => (
                            <tr key={a.id}>
                                <td><b>{a.title}</b></td>
                                <td className="muted">{a.year}</td>
                                <td className="muted">{a.photos_count}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.album.edit', a.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(a)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!album.data.length && (
                            <tr><td colSpan={4} className="muted center" style={{ padding: 28 }}>Belum ada album.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
