import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import { fmtDate } from '@/lib/format';

export default function Index({ kegiatan }) {
    function destroy(k) {
        if (confirm(`Hapus kegiatan "${k.title}"?`)) {
            router.delete(route('admin.kegiatan.destroy', k.id));
        }
    }

    return (
        <AdminLayout title="Kelola Kegiatan">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Kegiatan</h1>
                    <p className="muted">Atur agenda kegiatan yang tampil di halaman publik.</p>
                </div>
                <Link href={route('admin.kegiatan.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Kegiatan</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Judul</th><th>Lokasi</th><th>Mulai</th><th>Selesai</th><th></th></tr>
                    </thead>
                    <tbody>
                        {kegiatan.data.map((k) => (
                            <tr key={k.id}>
                                <td><b>{k.title}</b></td>
                                <td className="muted">{k.location || '—'}</td>
                                <td className="muted">{fmtDate(k.start_at)}</td>
                                <td className="muted">{fmtDate(k.end_at)}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.kegiatan.edit', k.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(k)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!kegiatan.data.length && (
                            <tr><td colSpan={5} className="muted center" style={{ padding: 28 }}>Belum ada kegiatan.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
