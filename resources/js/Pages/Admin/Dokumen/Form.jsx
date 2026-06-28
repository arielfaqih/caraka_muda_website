import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ dokumen }) {
    const editing = !!dokumen;
    const [fileName, setFileName] = useState(null);
    const { data, setData, post, transform, processing, errors } = useForm({
        title: dokumen?.title || '',
        cat: dokumen?.cat || 'Laporan',
        file: null,
    });

    function pickFile(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('file', file);
        setFileName(file.name);
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            // PHP can't parse multipart bodies on PUT, so spoof it as POST (Inertia doesn't do this automatically).
            transform((d) => ({ ...d, _method: 'put' }));
            post(route('admin.dokumen.update', dokumen.id), { forceFormData: true });
        } else {
            post(route('admin.dokumen.store'));
        }
    }

    return (
        <AdminLayout title={editing ? 'Ubah Dokumen' : 'Tambah Dokumen'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Dokumen' : 'Tambah Dokumen'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Judul Dokumen</label>
                    <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    {errors.title && <div className="err mt8">{errors.title}</div>}
                </div>

                <div className="field">
                    <label className="label">Kategori</label>
                    <input className="input" list="cat-list" value={data.cat} onChange={(e) => setData('cat', e.target.value)} />
                    <datalist id="cat-list">
                        <option value="Dasar Organisasi" />
                        <option value="Laporan" />
                        <option value="Program" />
                        <option value="Proposal" />
                    </datalist>
                    {errors.cat && <div className="err mt8">{errors.cat}</div>}
                </div>

                <div className="field">
                    <label className="label">Berkas {!editing && <span className="req">*</span>}</label>
                    <input className="input" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={pickFile} />
                    <p className="hint" style={{ marginTop: 6 }}>
                        {editing && dokumen.file_path && !fileName
                            ? 'Sudah ada berkas tersimpan — pilih file baru untuk menggantinya.'
                            : 'Format PDF/DOC/XLS. Maks. 10MB.'}
                        {fileName && <> Terpilih: <b>{fileName}</b></>}
                    </p>
                    {errors.file && <div className="err mt8">{errors.file}</div>}
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
