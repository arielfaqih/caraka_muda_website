import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ timeline }) {
    const editing = !!timeline;
    const { data, setData, post, put, processing, errors } = useForm({
        title: timeline?.title || '',
        description: timeline?.description || '',
        date: timeline?.date ? timeline.date.slice(0, 10) : '',
        order: timeline?.order ?? 0,
    });

    function submit(e) {
        e.preventDefault();
        if (editing) put(route('admin.timeline.update', timeline.id));
        else post(route('admin.timeline.store'));
    }

    return (
        <AdminLayout title={editing ? 'Ubah Momen Timeline' : 'Tambah Momen Timeline'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Momen Timeline' : 'Tambah Momen Timeline'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Tanggal</label>
                    <input className="input" type="date" style={{ maxWidth: 220 }} value={data.date} onChange={(e) => setData('date', e.target.value)} />
                    {errors.date && <div className="err mt8">{errors.date}</div>}
                </div>

                <div className="field">
                    <label className="label">Judul</label>
                    <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Misal: Caraka Muda Resmi Didirikan" />
                    {errors.title && <div className="err mt8">{errors.title}</div>}
                </div>

                <div className="field">
                    <label className="label">Deskripsi</label>
                    <textarea className="textarea" style={{ minHeight: 100 }} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    {errors.description && <div className="err mt8">{errors.description}</div>}
                </div>

                <div className="field">
                    <label className="label">Urutan Tampil</label>
                    <input className="input" type="number" style={{ maxWidth: 140 }} value={data.order} onChange={(e) => setData('order', e.target.value)} />
                    <p className="hint" style={{ marginTop: 6 }}>Dipakai untuk mengurutkan momen yang tanggalnya sama.</p>
                    {errors.order && <div className="err mt8">{errors.order}</div>}
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
