import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ mitra }) {
    const editing = !!mitra;
    const [preview, setPreview] = useState(mitra?.logo_url || null);
    const { data, setData, post, transform, processing, errors } = useForm({
        name: mitra?.name || '',
        cat: mitra?.cat || 'Komunitas',
        logo: null,
    });

    function pickLogo(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('logo', file);
        setPreview(URL.createObjectURL(file));
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            // PHP can't parse multipart bodies on PUT, so spoof it as POST (Inertia doesn't do this automatically).
            transform((d) => ({ ...d, _method: 'put' }));
            post(route('admin.mitra.update', mitra.id), { forceFormData: true });
        } else {
            post(route('admin.mitra.store'));
        }
    }

    return (
        <AdminLayout title={editing ? 'Ubah Mitra' : 'Tambah Mitra'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Mitra' : 'Tambah Mitra'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Logo</label>
                    <div className="row gap16" style={{ alignItems: 'flex-start' }}>
                        <div
                            style={{
                                width: 88, height: 88, borderRadius: 'var(--r-sm)', flex: 'none',
                                background: preview ? `center/contain no-repeat url(${preview})` : 'var(--paper2)',
                                border: '1.5px solid var(--line-2)',
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <input className="input" type="file" accept="image/*" onChange={pickLogo} />
                            <p className="hint" style={{ marginTop: 6 }}>Opsional — tanpa logo akan tampil nama saja. Maks. 2MB.</p>
                            {errors.logo && <div className="err mt8">{errors.logo}</div>}
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Nama Mitra</label>
                    <input className="input" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <div className="err mt8">{errors.name}</div>}
                </div>

                <div className="field">
                    <label className="label">Kategori</label>
                    <input className="input" list="cat-list" value={data.cat} onChange={(e) => setData('cat', e.target.value)} />
                    <datalist id="cat-list">
                        <option value="Pemerintah" />
                        <option value="Komunitas" />
                        <option value="Media" />
                        <option value="Sponsor" />
                        <option value="Akademik" />
                    </datalist>
                    {errors.cat && <div className="err mt8">{errors.cat}</div>}
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
