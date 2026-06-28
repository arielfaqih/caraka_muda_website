import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { fmtDate } from '@/lib/format';

export default function Index({ pesan }) {
    return (
        <AdminLayout title="Pesan Masuk">
            <h1 style={{ fontSize: '1.9rem' }}>Pesan Masuk</h1>
            <p className="muted" style={{ marginBottom: 22 }}>Pesan dari halaman kontak.</p>

            <div style={{ display: 'grid', gap: 12 }}>
                {pesan.map((p) => (
                    <div key={p.id} className="card pad" style={!p.read ? { borderColor: 'var(--red-tint)' } : {}}>
                        <div className="row between wrap gap12">
                            <div>
                                <b>{p.nama}</b> <span className="muted">· {p.email}</span>
                                <div className="muted" style={{ fontSize: '.86rem' }}>{p.subjek}</div>
                            </div>
                            <div className="row gap12">
                                <span className="muted" style={{ fontSize: '.8rem' }}>{fmtDate(p.created_at)}</span>
                                {!p.read && (
                                    <button onClick={() => router.put(route('admin.pesan.read', p.id))} className="btn btn-soft btn-sm">
                                        Tandai dibaca
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="mt16" style={{ fontSize: '.92rem' }}>{p.pesan}</p>
                    </div>
                ))}
                {!pesan.length && <p className="muted">Belum ada pesan.</p>}
            </div>
        </AdminLayout>
    );
}
