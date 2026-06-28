import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';

export default function Index({ faq }) {
    function destroy(f) {
        if (confirm(`Hapus FAQ "${f.q}"?`)) {
            router.delete(route('admin.faq.destroy', f.id));
        }
    }

    return (
        <AdminLayout title="Kelola FAQ">
            <div className="row between wrap gap12" style={{ marginBottom: 22 }}>
                <div>
                    <h1 style={{ fontSize: '1.9rem' }}>Kelola FAQ</h1>
                    <p className="muted">Atur pertanyaan & jawaban yang tampil di halaman FAQ.</p>
                </div>
                <Link href={route('admin.faq.create')} className="btn btn-primary"><Icon name="plus" /> Tambah FAQ</Link>
            </div>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Urutan</th><th>Pertanyaan</th><th>Jawaban</th><th></th></tr>
                    </thead>
                    <tbody>
                        {faq.map((f) => (
                            <tr key={f.id}>
                                <td className="muted">{f.order}</td>
                                <td><b>{f.q}</b></td>
                                <td className="muted" style={{ maxWidth: 360 }}>{f.a}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={route('admin.faq.edit', f.id)} className="iconbtn" aria-label="Ubah"><Icon name="edit" /></Link>
                                    <button onClick={() => destroy(f)} className="iconbtn" style={{ color: 'var(--red)' }} aria-label="Hapus"><Icon name="trash" /></button>
                                </td>
                            </tr>
                        ))}
                        {!faq.length && (
                            <tr><td colSpan={4} className="muted center" style={{ padding: 28 }}>Belum ada FAQ.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
