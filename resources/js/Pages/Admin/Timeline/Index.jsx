import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import { fmtDate } from '@/lib/format';

export default function Index({ timeline }) {
    function destroy(t) {
        if (confirm(`Hapus momen timeline "${t.title}"?`)) {
            router.delete(route('admin.timeline.destroy', t.id));
        }
    }

    return (
        <AdminLayout title="Kelola Timeline">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Timeline</h1>
                    <p className="muted">Atur momen/perjalanan organisasi yang tampil di halaman Timeline.</p>
                </div>
                <Link href={route('admin.timeline.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Momen</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Tanggal</th><th>Judul</th><th>Deskripsi</th><th></th></tr>
                    </thead>
                    <tbody>
                        {timeline.map((t) => (
                            <tr key={t.id}>
                                <td className="muted" style={{ whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</td>
                                <td><b>{t.title}</b></td>
                                <td className="muted" style={{ maxWidth: 360 }}>{t.description}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.timeline.edit', t.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(t)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!timeline.length && (
                            <tr><td colSpan={4} className="muted center" style={{ padding: 28 }}>Belum ada momen timeline.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
