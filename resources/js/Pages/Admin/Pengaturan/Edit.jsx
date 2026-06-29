import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

function toLocalInput(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Edit({ settings }) {
    const { data, setData, put, processing, errors } = useForm({
        site_name: settings.site_name || '',
        tagline: settings.tagline || '',
        recruitment_open: settings.recruitment_open || false,
        recruitment_opens_at: toLocalInput(settings.recruitment_opens_at),
        recruitment_closes_at: toLocalInput(settings.recruitment_closes_at),
        contact: {
            email: settings.contact?.email || '',
            whatsapp: settings.contact?.whatsapp || '',
            address: settings.contact?.address || '',
        },
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.pengaturan.update'));
    }

    return (
        <AdminLayout title="Pengaturan">
            <h1 style={{ fontSize: '1.9rem' }}>Pengaturan</h1>
            <p className="muted" style={{ marginBottom: 22 }}>Kelola informasi dasar &amp; status rekrutmen.</p>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Nama Situs</label>
                    <input className="input" value={data.site_name} onChange={(e) => setData('site_name', e.target.value)} />
                </div>
                <div className="field">
                    <label className="label">Tagline</label>
                    <input className="input" value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} />
                </div>

                <label className="checkbox" style={{ marginBottom: 12 }}>
                    <input type="checkbox" checked={data.recruitment_open} onChange={(e) => setData('recruitment_open', e.target.checked)} />
                    <span>Buka pendaftaran anggota baru</span>
                </label>

                <div className="card pad" style={{ background: 'var(--surface-2)', marginBottom: 20 }}>
                    <h3 style={{ fontSize: '.95rem', marginBottom: 6 }}>Jadwal Pendaftaran (opsional)</h3>
                    <p className="hint" style={{ marginBottom: 14 }}>
                        Kalau diisi, pendaftaran otomatis terbuka/tertutup sesuai tanggal ini (selama kotak di atas tetap dicentang).
                        Kosongkan kalau mau atur buka/tutup manual lewat kotak centang saja.
                    </p>
                    <div className="row gap16 wrap">
                        <div className="field" style={{ flex: 1, minWidth: 200 }}>
                            <label className="label">Dibuka mulai</label>
                            <input
                                className="input" type="datetime-local"
                                value={data.recruitment_opens_at}
                                onChange={(e) => setData('recruitment_opens_at', e.target.value)}
                            />
                            {errors.recruitment_opens_at && <div className="err mt8">{errors.recruitment_opens_at}</div>}
                        </div>
                        <div className="field" style={{ flex: 1, minWidth: 200 }}>
                            <label className="label">Ditutup pada</label>
                            <input
                                className="input" type="datetime-local"
                                value={data.recruitment_closes_at}
                                onChange={(e) => setData('recruitment_closes_at', e.target.value)}
                            />
                            {errors.recruitment_closes_at && <div className="err mt8">{errors.recruitment_closes_at}</div>}
                        </div>
                    </div>
                </div>

                <div className="card pad" style={{ background: 'var(--surface-2)', marginBottom: 20 }}>
                    <h3 style={{ fontSize: '.95rem', marginBottom: 12 }}>Kontak</h3>
                    <div className="field">
                        <input className="input" value={data.contact.email} onChange={(e) => setData('contact', { ...data.contact, email: e.target.value })} placeholder="Email" />
                    </div>
                    <div className="field">
                        <input className="input" value={data.contact.whatsapp} onChange={(e) => setData('contact', { ...data.contact, whatsapp: e.target.value })} placeholder="WhatsApp" />
                    </div>
                    <div className="field" style={{ marginBottom: 0 }}>
                        <input className="input" value={data.contact.address} onChange={(e) => setData('contact', { ...data.contact, address: e.target.value })} placeholder="Alamat" />
                    </div>
                </div>

                <SubmitButton processing={processing}>Simpan Pengaturan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
