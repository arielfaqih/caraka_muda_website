import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';
import { fmtDate } from '@/lib/format';

const STATUSES = ['baru', 'diproses', 'diterima', 'ditolak'];

function toLocalInput(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Index({ pendaftar, settings }) {
    const { data, setData, put, processing, errors } = useForm({
        recruitment_open: settings.recruitment_open || false,
        recruitment_opens_at: toLocalInput(settings.recruitment_opens_at),
        recruitment_closes_at: toLocalInput(settings.recruitment_closes_at),
    });

    function saveRecruitment(e) {
        e.preventDefault();
        put(route('admin.pendaftar.rekrutmen.update'));
    }

    function updateStatus(p, status) {
        router.put(route('admin.pendaftar.update', p.id), { status });
    }

    return (
        <AdminLayout title="Kelola Pendaftaran">
            <h1 style={{ fontSize: '1.9rem' }}>Kelola Pendaftaran</h1>
            <p className="muted" style={{ marginBottom: 22 }}>Atur kapan pendaftaran anggota baru dibuka, dan kelola calon anggota yang sudah mendaftar.</p>

            <form onSubmit={saveRecruitment} className="card pad" style={{ padding: 28, marginBottom: 28 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Status Pendaftaran</h3>
                <p className="hint" style={{ marginBottom: 16 }}>
                    Centang untuk membuka pendaftaran. Isi tanggal kalau mau pendaftaran otomatis buka/tutup sesuai jadwal —
                    kosongkan kalau ingin atur manual lewat kotak centang saja.
                </p>

                <label className="checkbox" style={{ marginBottom: 16 }}>
                    <input type="checkbox" checked={data.recruitment_open} onChange={(e) => setData('recruitment_open', e.target.checked)} />
                    <span>Buka pendaftaran anggota baru</span>
                </label>

                <div className="row gap16 wrap" style={{ marginBottom: 16 }}>
                    <div className="field" style={{ flex: 1, minWidth: 200, marginBottom: 0 }}>
                        <label className="label">Dibuka mulai</label>
                        <input
                            className="input" type="datetime-local"
                            value={data.recruitment_opens_at}
                            onChange={(e) => setData('recruitment_opens_at', e.target.value)}
                        />
                        {errors.recruitment_opens_at && <div className="err mt8">{errors.recruitment_opens_at}</div>}
                    </div>
                    <div className="field" style={{ flex: 1, minWidth: 200, marginBottom: 0 }}>
                        <label className="label">Ditutup pada</label>
                        <input
                            className="input" type="datetime-local"
                            value={data.recruitment_closes_at}
                            onChange={(e) => setData('recruitment_closes_at', e.target.value)}
                        />
                        {errors.recruitment_closes_at && <div className="err mt8">{errors.recruitment_closes_at}</div>}
                    </div>
                </div>

                <SubmitButton processing={processing}>Simpan Jadwal</SubmitButton>
            </form>

            <p className="muted" style={{ marginBottom: 12 }}>{pendaftar.length} calon anggota.</p>

            <div className="tbl-wrap">
                <table className="tbl">
                    <thead>
                        <tr><th>Nama</th><th>Kontak</th><th>Divisi</th><th>Tanggal</th><th>Berkas</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {pendaftar.map((p) => (
                            <tr key={p.id}>
                                <td><b>{p.nama}</b></td>
                                <td className="muted">{p.email}<br />{p.whatsapp}</td>
                                <td className="muted">{p.divisi?.name}</td>
                                <td className="muted">{fmtDate(p.created_at)}</td>
                                <td>
                                    {p.cv_url && (
                                        <a href={p.cv_url} target="_blank" rel="noopener noreferrer" className="iconbtn" aria-label="Unduh CV" title="CV">
                                            <Icon name="doc" />
                                        </a>
                                    )}
                                    {p.portofolio_url && (
                                        <a href={p.portofolio_url} target="_blank" rel="noopener noreferrer" className="iconbtn" aria-label="Unduh Portofolio" title="Portofolio">
                                            <Icon name="download" />
                                        </a>
                                    )}
                                    {!p.cv_url && !p.portofolio_url && <span className="muted">—</span>}
                                </td>
                                <td>
                                    <select className="select" style={{ padding: '6px 28px 6px 10px', fontSize: '.82rem' }} value={p.status} onChange={(e) => updateStatus(p, e.target.value)}>
                                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {!pendaftar.length && (
                            <tr><td colSpan={6} className="muted center" style={{ padding: 28 }}>Belum ada pendaftar.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
