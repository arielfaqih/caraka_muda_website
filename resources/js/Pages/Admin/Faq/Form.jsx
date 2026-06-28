import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ faq }) {
    const editing = !!faq;
    const { data, setData, post, put, processing, errors } = useForm({
        q: faq?.q || '',
        a: faq?.a || '',
        order: faq?.order ?? 0,
    });

    function submit(e) {
        e.preventDefault();
        if (editing) put(route('admin.faq.update', faq.id));
        else post(route('admin.faq.store'));
    }

    return (
        <AdminLayout title={editing ? 'Ubah FAQ' : 'Tambah FAQ'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah FAQ' : 'Tambah FAQ'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Pertanyaan</label>
                    <input className="input" value={data.q} onChange={(e) => setData('q', e.target.value)} />
                    {errors.q && <div className="err mt8">{errors.q}</div>}
                </div>

                <div className="field">
                    <label className="label">Jawaban</label>
                    <textarea className="textarea" style={{ minHeight: 120 }} value={data.a} onChange={(e) => setData('a', e.target.value)} />
                    {errors.a && <div className="err mt8">{errors.a}</div>}
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
