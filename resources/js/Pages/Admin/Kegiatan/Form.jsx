import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import SubmitButton from '@/Components/SubmitButton';

function toLocalInput(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Form({ kegiatan }) {
    const editing = !!kegiatan;
    const { data, setData, post, put, processing, errors } = useForm({
        title: kegiatan?.title || '',
        description: kegiatan?.description || '',
        location: kegiatan?.location || '',
        start_at: toLocalInput(kegiatan?.start_at),
        end_at: toLocalInput(kegiatan?.end_at),
    });

    function submit(e) {
        e.preventDefault();
        if (editing) put(route('admin.kegiatan.update', kegiatan.id));
        else post(route('admin.kegiatan.store'));
    }

    return (
        <AdminLayout title={editing ? 'Ubah Kegiatan' : 'Tambah Kegiatan'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Kegiatan' : 'Tambah Kegiatan'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Judul Kegiatan</label>
                    <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    {errors.title && <div className="err mt8">{errors.title}</div>}
                </div>

                <div className="field">
                    <label className="label">Deskripsi</label>
                    <textarea className="textarea" style={{ minHeight: 90 }} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    {errors.description && <div className="err mt8">{errors.description}</div>}
                </div>

                <div className="field">
                    <label className="label">Lokasi</label>
                    <input className="input" value={data.location} onChange={(e) => setData('location', e.target.value)} />
                    {errors.location && <div className="err mt8">{errors.location}</div>}
                </div>

                <div className="row gap16 wrap">
                    <div className="field" style={{ flex: 1, minWidth: 200 }}>
                        <label className="label">Mulai</label>
                        <input className="input" type="datetime-local" value={data.start_at} onChange={(e) => setData('start_at', e.target.value)} />
                        {errors.start_at && <div className="err mt8">{errors.start_at}</div>}
                    </div>
                    <div className="field" style={{ flex: 1, minWidth: 200 }}>
                        <label className="label">Selesai</label>
                        <input className="input" type="datetime-local" value={data.end_at} onChange={(e) => setData('end_at', e.target.value)} />
                        {errors.end_at && <div className="err mt8">{errors.end_at}</div>}
                    </div>
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
