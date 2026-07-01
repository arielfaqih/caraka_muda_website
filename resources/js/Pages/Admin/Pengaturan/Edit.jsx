import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Edit({ settings }) {
    const { data, setData, put, processing, errors } = useForm({
        site_name: settings.site_name || '',
        tagline: settings.tagline || '',
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
            <p className="muted" style={{ marginBottom: 22 }}>Kelola informasi dasar situs &amp; kontak.</p>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Nama Situs</label>
                    <input className="input" value={data.site_name} onChange={(e) => setData('site_name', e.target.value)} />
                </div>
                <div className="field">
                    <label className="label">Tagline</label>
                    <input className="input" value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} />
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
