import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ prestasi }) {
    const editing = !!prestasi;
    const { data, setData, post, put, processing, errors } = useForm({
        title: prestasi?.title || '',
        year: prestasi?.year || new Date().getFullYear(),
        desc: prestasi?.desc || '',
    });

    function submit(e) {
        e.preventDefault();
        if (editing) put(route('admin.prestasi.update', prestasi.id));
        else post(route('admin.prestasi.store'));
    }

    return (
        <AdminLayout title={editing ? 'Ubah Prestasi' : 'Tambah Prestasi'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Prestasi' : 'Tambah Prestasi'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Judul Prestasi</label>
                    <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    {errors.title && <div className="err mt8">{errors.title}</div>}
                </div>

                <div className="field">
                    <label className="label">Tahun</label>
                    <input className="input" type="number" style={{ maxWidth: 140 }} value={data.year} onChange={(e) => setData('year', e.target.value)} />
                    {errors.year && <div className="err mt8">{errors.year}</div>}
                </div>

                <div className="field">
                    <label className="label">Deskripsi</label>
                    <textarea className="textarea" style={{ minHeight: 90 }} value={data.desc} onChange={(e) => setData('desc', e.target.value)} />
                    {errors.desc && <div className="err mt8">{errors.desc}</div>}
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
