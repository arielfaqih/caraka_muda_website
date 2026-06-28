import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import { fmtDate } from '@/lib/format';

export default function Index({ berita }) {
    function destroy(b) {
        if (confirm(`Hapus berita "${b.title}"?`)) {
            router.delete(route('admin.berita.destroy', b.id));
        }
    }

    return (
        <AdminLayout title="Kelola Berita">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Berita</h1>
                    <p className="muted">Tulis, ubah, atau hapus artikel.</p>
                </div>
                <Link href={route('admin.berita.create')} className="btn btn-primary"><Icon name="plus" /> Tulis Berita</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Judul</th><th>Kategori</th><th>Status</th><th>Tanggal</th><th></th></tr>
                    </thead>
                    <tbody>
                        {berita.data.map((b) => (
                            <tr key={b.id}>
                                <td><b>{b.title}</b></td>
                                <td className="muted">{b.category}</td>
                                <td><span className={`badge ${b.status === 'published' ? 'soon' : 'done'}`}>{b.status}</span></td>
                                <td className="muted">{fmtDate(b.published_at)}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.berita.edit', b.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(b)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!berita.data.length && (
                            <tr><td colSpan={5} className="muted center" style={{ padding: 28 }}>Belum ada berita.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
