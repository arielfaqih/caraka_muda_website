import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Form({ album }) {
    const editing = !!album;
    const { data, setData, post, put, processing, errors } = useForm({
        title: album?.title || '',
        year: album?.year || new Date().getFullYear(),
    });

    function submit(e) {
        e.preventDefault();
        if (editing) put(route('admin.album.update', album.id));
        else post(route('admin.album.store'));
    }

    function uploadPhotos(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const form = new FormData();
        files.forEach((f) => form.append('photos[]', f));
        router.post(route('admin.album.foto.store', album.id), form, { forceFormData: true });
        e.target.value = '';
    }

    function destroyPhoto(photo) {
        if (confirm('Hapus foto ini?')) {
            router.delete(route('admin.album.foto.destroy', [album.id, photo.id]));
        }
    }

    return (
        <AdminLayout title={editing ? 'Ubah Album' : 'Tambah Album'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Album' : 'Tambah Album'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 560, padding: 32 }}>
                <div className="field">
                    <label className="label">Judul Album</label>
                    <input className="input" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    {errors.title && <div className="err mt8">{errors.title}</div>}
                </div>

                <div className="field">
                    <label className="label">Tahun</label>
                    <input className="input" type="number" style={{ maxWidth: 140 }} value={data.year} onChange={(e) => setData('year', e.target.value)} />
                    {errors.year && <div className="err mt8">{errors.year}</div>}
                </div>

                <SubmitButton processing={processing}>{editing ? 'Simpan' : 'Buat Album & Lanjut Tambah Foto'}</SubmitButton>
            </form>

            {editing && (
                <div className="card pad" style={{ maxWidth: 560, padding: 32, marginTop: 22 }}>
                    <label className="label">Foto Album</label>
                    <input className="input" type="file" accept="image/*" multiple onChange={uploadPhotos} />
                    <p className="hint" style={{ marginTop: 6 }}>Bisa pilih beberapa foto sekaligus. Maks. 5MB per foto.</p>

                    <div className="row gap12 wrap" style={{ marginTop: 16 }}>
                        {album.photos.map((p) => (
                            <div key={p.id} style={{ position: 'relative', width: 100, height: 100 }}>
                                <img
                                    src={p.photo_url}
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--line-2)' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => destroyPhoto(p)}
                                    className="iconbtn"
                                    style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,.55)', color: '#fff' }}
                                    aria-label="Hapus foto"
                                >
                                    <Icon name="trash" />
                                </button>
                            </div>
                        ))}
                        {!album.photos.length && <p className="muted">Belum ada foto di album ini.</p>}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
