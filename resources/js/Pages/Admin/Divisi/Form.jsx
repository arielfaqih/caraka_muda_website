import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

const ICONS = ['shield', 'mega', 'settings', 'users', 'heart', 'spark', 'brief', 'image', 'grid'];

export default function Form({ divisi }) {
    const editing = !!divisi;
    const { data, setData, post, put, processing, errors } = useForm({
        name: divisi?.name || '',
        icon: divisi?.icon || 'grid',
        desc: divisi?.desc || '',
        order: divisi?.order ?? 0,
    });

    function submit(e) {
        e.preventDefault();
        if (editing) put(route('admin.divisi.update', divisi.id));
        else post(route('admin.divisi.store'));
    }

    return (
        <AdminLayout title={editing ? 'Ubah Divisi' : 'Tambah Divisi'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Divisi' : 'Tambah Divisi'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Nama Divisi</label>
                    <input className="input" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <div className="err mt8">{errors.name}</div>}
                </div>

                <div className="field">
                    <label className="label">Ikon</label>
                    <div className="row gap8 wrap">
                        {ICONS.map((i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() => setData('icon', i)}
                                className={`iconbtn ${data.icon === i ? 'on' : ''}`}
                                style={{ border: data.icon === i ? '1.5px solid var(--accent)' : '1.5px solid var(--line-2)' }}
                                aria-label={i}
                            >
                                <Icon name={i} />
                            </button>
                        ))}
                    </div>
                    {errors.icon && <div className="err mt8">{errors.icon}</div>}
                </div>

                <div className="field">
                    <label className="label">Deskripsi</label>
                    <textarea className="textarea" style={{ minHeight: 90 }} value={data.desc} onChange={(e) => setData('desc', e.target.value)} />
                    {errors.desc && <div className="err mt8">{errors.desc}</div>}
                </div>

                <div className="field">
                    <label className="label">Urutan Tampil</label>
                    <input className="input" type="number" style={{ maxWidth: 140 }} value={data.order} onChange={(e) => setData('order', e.target.value)} />
                    {errors.order && <div className="err mt8">{errors.order}</div>}
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>
        </AdminLayout>
    );
}
