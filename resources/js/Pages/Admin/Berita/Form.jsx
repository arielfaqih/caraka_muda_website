import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ berita }) {
    const editing = !!berita;
    const [preview, setPreview] = useState(berita?.image_url || null);
    const { data, setData, post, transform, processing, errors } = useForm({
        title: berita?.title || '',
        category: berita?.category || 'Pengumuman',
        excerpt: berita?.excerpt || '',
        body: berita?.body || '',
        status: berita?.status || 'published',
        featured: berita?.featured || false,
        image: null,
    });

    function pickImage(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('image', file);
        setPreview(URL.createObjectURL(file));
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            // PHP can't parse multipart bodies on PUT, so spoof it as POST (Inertia doesn't do this automatically).
            transform((d) => ({ ...d, _method: 'put' }));
            post(route('admin.berita.update', berita.id), { forceFormData: true });
        } else {
            post(route('admin.berita.store'));
        }
    }

    return (
        <AdminLayout title={editing ? 'Ubah Berita' : 'Tulis Berita'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Berita' : 'Tulis Berita'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 680, padding: 32 }}>
                <div className="field">
                    <label className="label">Foto Berita {!editing && <span className="req">*</span>}</label>
                    <div className="row gap16" style={{ alignItems: 'flex-start' }}>
                        <div
                            style={{
                                width: 140, height: 88, borderRadius: 'var(--r-sm)', flex: 'none',
                                background: preview ? `center/cover no-repeat url(${preview})` : 'var(--paper2)',
                                border: '1.5px solid var(--line-2)',
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <input className="input" type="file" accept="image/*" onChange={pickImage} />
                            <p className="hint" style={{ marginTop: 6 }}>
                                Rasio foto bebas — akan otomatis disesuaikan agar seragam dengan kartu berita lain. Maks. 10MB.
                            </p>
                            {errors.image && <div className="err mt8">{errors.image}</div>}
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Judul</label>
                    <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    {errors.title && <div className="err mt8">{errors.title}</div>}
                </div>

                <div className="form-grid">
                    <div className="field">
                        <label className="label">Kategori</label>
                        <select className="select" value={data.category} onChange={(e) => setData('category', e.target.value)}>
                            <option value="Pengumuman">Pengumuman</option>
                            <option value="Liputan Kegiatan">Liputan Kegiatan</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Opini">Opini</option>
                            <option value="Kerja Sama">Kerja Sama</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Status</label>
                        <select className="select" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Ringkasan</label>
                    <textarea className="textarea" style={{ minHeight: 70 }} value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} />
                </div>

                <div className="field">
                    <label className="label">Isi Berita</label>
                    <textarea className="textarea" style={{ minHeight: 220 }} value={data.body} onChange={(e) => setData('body', e.target.value)} />
                    {errors.body && <div className="err mt8">{errors.body}</div>}
                </div>

                <label className="checkbox" style={{ marginBottom: 20 }}>
                    <input type="checkbox" checked={data.featured} onChange={(e) => setData('featured', e.target.checked)} />
                    <span>Jadikan berita unggulan</span>
                </label>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
