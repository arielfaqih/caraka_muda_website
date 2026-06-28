import { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

function AkunCard({ pengurus }) {
    const { flash } = usePage().props;
    const [email, setEmail] = useState('');
    const [busy, setBusy] = useState(false);

    function createAccount(e) {
        e.preventDefault();
        setBusy(true);
        router.post(route('admin.pengurus.akun.store', pengurus.id), { email }, { onFinish: () => setBusy(false) });
    }

    function resetPassword() {
        if (!confirm('Reset password akun ini?')) return;
        router.put(route('admin.pengurus.akun.reset', pengurus.id));
    }

    function deleteAccount() {
        if (!confirm('Hapus akun login ini? Anggota tidak akan bisa masuk lagi.')) return;
        router.delete(route('admin.pengurus.akun.destroy', pengurus.id));
    }

    return (
        <div className="card pad mt24" style={{ maxWidth: 680, padding: 32 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 6 }}>Akun Login</h3>
            <p className="muted" style={{ marginBottom: 18, fontSize: '.9rem' }}>
                Hanya anggota dengan akun yang dibuatkan di sini yang bisa masuk dan melihat halaman Profil Saya.
            </p>

            {flash?.generated_password && (
                <div className="note mt8" style={{ marginBottom: 18 }}>
                    Password: <b>{flash.generated_password}</b> — catat &amp; bagikan sekarang, tidak akan ditampilkan lagi.
                </div>
            )}

            {pengurus.user ? (
                <>
                    <p style={{ marginBottom: 14 }}>Email: <b>{pengurus.user.email}</b></p>
                    <div className="row gap12 wrap">
                        <button type="button" className="btn btn-ghost" onClick={resetPassword}><Icon name="settings" /> Reset Password</button>
                        <button type="button" className="btn btn-ghost" style={{ color: 'var(--red)' }} onClick={deleteAccount}><Icon name="trash" /> Hapus Akun</button>
                    </div>
                </>
            ) : (
                <form onSubmit={createAccount} className="row gap12 wrap" style={{ alignItems: 'flex-start' }}>
                    <input
                        className="input" type="email" required placeholder="email@contoh.com"
                        style={{ maxWidth: 280 }} value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <SubmitButton processing={busy} icon="plus" className="btn btn-primary">Buatkan Akun</SubmitButton>
                </form>
            )}
        </div>
    );
}

export default function Form({ pengurus, divisis }) {
    const editing = !!pengurus;
    const [preview, setPreview] = useState(pengurus?.photo_url || null);
    const { data, setData, post, transform, processing, errors } = useForm({
        name: pengurus?.name || '',
        role: pengurus?.role || '',
        struktur_type: pengurus?.struktur_type || 'internal',
        divisi_id: pengurus?.divisi_id || '',
        seksi: pengurus?.seksi || '',
        period: pengurus?.period || '2025/2026',
        bio: pengurus?.bio || '',
        ig: pengurus?.ig || '',
        li: pengurus?.li || '',
        order: pengurus?.order ?? 0,
        photo: null,
    });

    function pickPhoto(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('photo', file);
        setPreview(URL.createObjectURL(file));
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            // PHP can't parse multipart bodies on PUT, so spoof it as POST (Inertia doesn't do this automatically).
            transform((d) => ({ ...d, _method: 'put' }));
            post(route('admin.pengurus.update', pengurus.id), { forceFormData: true });
        } else {
            post(route('admin.pengurus.store'));
        }
    }

    return (
        <AdminLayout title={editing ? 'Ubah Pengurus' : 'Tambah Pengurus'}>
            <h1 style={{ fontSize: '1.9rem', marginBottom: 22 }}>{editing ? 'Ubah Pengurus' : 'Tambah Pengurus'}</h1>

            <form onSubmit={submit} className="card pad" style={{ maxWidth: 680, padding: 32 }}>
                <div className="field">
                    <label className="label">Foto (full body)</label>
                    <div className="row gap16" style={{ alignItems: 'flex-start' }}>
                        <div
                            style={{
                                width: 88, height: 110, borderRadius: 'var(--r-sm)', flex: 'none',
                                background: preview ? `center/cover no-repeat url(${preview})` : 'var(--paper2)',
                                border: '1.5px solid var(--line-2)',
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <input className="input" type="file" accept="image/*" onChange={pickPhoto} />
                            <p className="hint" style={{ marginTop: 6 }}>
                                Disarankan foto full body, rasio potret. Opsional — tanpa foto akan tampil inisial nama. Maks. 5MB.
                            </p>
                            {errors.photo && <div className="err mt8">{errors.photo}</div>}
                        </div>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="field">
                        <label className="label">Nama</label>
                        <input className="input" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <div className="err mt8">{errors.name}</div>}
                    </div>
                    <div className="field">
                        <label className="label">Jabatan / Role</label>
                        <input className="input" value={data.role} onChange={(e) => setData('role', e.target.value)} />
                        {errors.role && <div className="err mt8">{errors.role}</div>}
                    </div>
                </div>

                <div className="form-grid">
                    <div className="field">
                        <label className="label">Struktur</label>
                        <select className="select" value={data.struktur_type} onChange={(e) => setData('struktur_type', e.target.value)}>
                            <option value="internal">Internal (Caraka Muda)</option>
                            <option value="kkipp">KKIPP</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Periode</label>
                        <input className="input" value={data.period} onChange={(e) => setData('period', e.target.value)} />
                        {errors.period && <div className="err mt8">{errors.period}</div>}
                    </div>
                </div>

                {data.struktur_type === 'internal' ? (
                    <div className="field">
                        <label className="label">Divisi (kosongkan untuk Pengurus Harian)</label>
                        <select className="select" value={data.divisi_id} onChange={(e) => setData('divisi_id', e.target.value)}>
                            <option value="">— Tidak ada (Pengurus Harian) —</option>
                            {divisis.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                ) : (
                    <div className="field">
                        <label className="label">Seksi (kosongkan untuk Koordinator)</label>
                        <input
                            className="input" list="seksi-list" value={data.seksi}
                            onChange={(e) => setData('seksi', e.target.value)}
                            placeholder="Seksi Informasi Publik dan Layanan Terpadu"
                        />
                        <datalist id="seksi-list">
                            <option value="Seksi Informasi Publik dan Layanan Terpadu" />
                            <option value="Seksi Komunikasi dan Media" />
                            <option value="Seksi Administrasi Umum dan Sumber Daya" />
                        </datalist>
                    </div>
                )}

                <div className="field">
                    <label className="label">Bio Singkat</label>
                    <textarea className="textarea" style={{ minHeight: 90 }} value={data.bio} onChange={(e) => setData('bio', e.target.value)} />
                </div>

                <div className="form-grid">
                    <div className="field">
                        <label className="label">Instagram (username)</label>
                        <input className="input" value={data.ig} onChange={(e) => setData('ig', e.target.value)} />
                    </div>
                    <div className="field">
                        <label className="label">LinkedIn (username)</label>
                        <input className="input" value={data.li} onChange={(e) => setData('li', e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Urutan Tampil</label>
                    <input className="input" type="number" style={{ maxWidth: 140 }} value={data.order} onChange={(e) => setData('order', e.target.value)} />
                </div>

                <SubmitButton processing={processing}>Simpan</SubmitButton>
            </form>

            {editing && <AkunCard pengurus={pengurus} />}
        </AdminLayout>
    );
}
