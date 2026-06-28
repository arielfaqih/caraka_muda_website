import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import { fmtDate } from '@/lib/format';

export default function Index({ dokumen }) {
    function destroy(d) {
        if (confirm(`Hapus dokumen "${d.title}"?`)) {
            router.delete(route('admin.dokumen.destroy', d.id));
        }
    }

    return (
        <AdminLayout title="Kelola Transparansi">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola Transparansi</h1>
                    <p className="muted">Unggah dan kelola dokumen publik (AD/ART, laporan, proposal, dsb).</p>
                </div>
                <Link href={route('admin.dokumen.create')} className="btn btn-primary"><Icon name="plus" /> Tambah Dokumen</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Judul</th><th>Kategori</th><th>Diunggah</th><th></th></tr>
                    </thead>
                    <tbody>
                        {dokumen.data.map((d) => (
                            <tr key={d.id}>
                                <td><b>{d.title}</b></td>
                                <td className="muted">{d.cat}</td>
                                <td className="muted">{fmtDate(d.created_at)}</td>
                                <td style={{ textAlign: 'right' }}>
                                    {d.file_url && (
                                        <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="iconbtn" aria-label="Lihat">
                                            <Icon name="download" />
                                        </a>
                                    )}
                                    <Link href={route('admin.dokumen.edit', d.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(d)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!dokumen.data.length && (
                            <tr><td colSpan={4} className="muted center" style={{ padding: 28 }}>Belum ada dokumen.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
