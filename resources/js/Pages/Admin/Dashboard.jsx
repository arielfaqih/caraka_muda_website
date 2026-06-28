import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { fmtDate } from '@/lib/format';

export default function Dashboard({ stats, recentBerita }) {
    return (
        <AdminLayout title="Dashboard">
            <h1 style={{ fontSize: '1.9rem' }}>Halo, Admin 👋</h1>
            <p className="muted" style={{ margin: '4px 0 26px' }}>Ini ringkasan aktivitas Caraka Muda hari ini.</p>

            <div className="grid-4" style={{ marginBottom: 26 }}>
                <div className="metric"><div className="v">{stats.published}</div><div className="l">Berita Terbit</div></div>
                <div className="metric"><div className="v">{stats.agenda}</div><div className="l">Agenda Aktif</div></div>
                <div className="metric"><div className="v" style={{ color: 'var(--red)' }}>{stats.pendaftarBaru}</div><div className="l">Pendaftar Baru</div></div>
                <div className="metric"><div className="v" style={{ color: 'var(--red)' }}>{stats.pesanBelumDibaca}</div><div className="l">Pesan Belum Dibaca</div></div>
            </div>

            <div className="card pad">
                <div className="row between" style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Berita Terbaru</h3>
                    <Link href={route('admin.berita.index')} className="btn btn-ghost btn-sm">Lihat semua</Link>
                </div>
                <div className="tbl-wrap">
                    <table className="tbl">
                        <tbody>
                            {recentBerita.map((b) => (
                                <tr key={b.id}>
                                    <td><b>{b.title}</b><br /><span className="muted" style={{ fontSize: '.8rem' }}>{fmtDate(b.published_at)} · {b.category}</span></td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`badge ${b.status === 'published' ? 'soon' : 'done'}`}>{b.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
