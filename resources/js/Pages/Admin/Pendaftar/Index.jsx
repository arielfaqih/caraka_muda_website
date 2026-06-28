import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { fmtDate } from '@/lib/format';

const STATUSES = ['baru', 'diproses', 'diterima', 'ditolak'];

export default function Index({ pendaftar }) {
    function updateStatus(p, status) {
        router.put(route('admin.pendaftar.update', p.id), { status });
    }

    return (
        <AdminLayout title="Pendaftar">
            <h1 style={{ fontSize: '1.9rem' }}>Pendaftar</h1>
            <p className="muted" style={{ marginBottom: 22 }}>{pendaftar.length} calon anggota.</p>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Nama</th><th>Kontak</th><th>Divisi</th><th>Tanggal</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {pendaftar.map((p) => (
                            <tr key={p.id}>
                                <td><b>{p.nama}</b></td>
                                <td className="muted">{p.email}<br />{p.whatsapp}</td>
                                <td className="muted">{p.divisi?.name}</td>
                                <td className="muted">{fmtDate(p.created_at)}</td>
                                <td>
                                    <select className="select" style={{ padding: '6px 28px 6px 10px', fontSize: '.82rem' }} value={p.status} onChange={(e) => updateStatus(p, e.target.value)}>
                                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {!pendaftar.length && (
                            <tr><td colSpan={5} className="muted center" style={{ padding: 28 }}>Belum ada pendaftar.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
