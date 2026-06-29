import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

const BENEFIT = ['Pelatihan kepemimpinan', 'Jejaring luas', 'Sertifikat & pengalaman nyata'];
const SYARAT = ['Pemuda usia 16–28 tahun', 'Punya semangat berkontribusi', 'Berkomitmen mengikuti kegiatan'];

function fmtDateTime(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const CLOSED_COPY = {
    before_open: (opensAt) => ({
        title: 'Pendaftaran belum dibuka',
        desc: opensAt ? `Pendaftaran akan dibuka mulai ${fmtDateTime(opensAt)}. Pantau halaman ini ya!` : 'Pantau halaman ini untuk info pembukaan berikutnya.',
    }),
    after_close: () => ({
        title: 'Pendaftaran telah ditutup',
        desc: 'Periode pendaftaran kali ini sudah berakhir. Pantau halaman ini untuk info pembukaan berikutnya.',
    }),
    closed: () => ({
        title: 'Pendaftaran sedang ditutup',
        desc: 'Saat ini kami belum membuka rekrutmen. Pantau halaman ini untuk info pembukaan berikutnya.',
    }),
};

export default function Bergabung({ recruitmentOpen, recruitmentStatus, opensAt, closesAt, divisi }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '', email: '', whatsapp: '', institusi: '', divisi_id: '', motivasi: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('bergabung.store'), { onSuccess: () => reset() });
    }

    return (
        <PublicLayout title="Bergabung">
            <section className="hero" style={{ paddingBottom: 40 }}>
                <div className="hero-deco"><div className="blob b1" /></div>
                <div className="hero-stripes" />
                <div className="container" style={{ position: 'relative', textAlign: 'center', paddingTop: 30 }}>
                    <span className="hero-tagpill" style={{ margin: '0 auto 18px' }}>
                        <span className="dot" /> {recruitmentOpen ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                    </span>
                    <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)' }}>Jadi Bagian dari<br />Caraka Muda</h1>
                    <p className="hero-lede" style={{ margin: '18px auto 0' }}>
                        Satu langkah kecil hari ini bisa jadi cerita besar nanti. Yuk, tumbuh & berdampak bareng kami.
                    </p>
                    {recruitmentOpen && (opensAt || closesAt) && (
                        <p className="muted" style={{ marginTop: 10 }}>
                            {opensAt && closesAt
                                ? `Periode pendaftaran: ${fmtDateTime(opensAt)} – ${fmtDateTime(closesAt)}`
                                : closesAt
                                    ? `Pendaftaran ditutup pada ${fmtDateTime(closesAt)}`
                                    : `Dibuka sejak ${fmtDateTime(opensAt)}`}
                        </p>
                    )}
                </div>
                <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,40 C360,80 720,0 1080,30 C1260,45 1380,55 1440,50 L1440,70 L0,70 Z" />
                </svg>
            </section>

            <section className="sec"><div className="container">
                <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
                    <div>
                        <span className="eyebrow">Kenapa Gabung</span>
                        <h2 style={{ fontSize: '2rem', margin: '12px 0 20px' }}>Yang kamu dapat</h2>
                        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
                            {BENEFIT.map((b) => (
                                <div key={b} className="card pad row gap12" style={{ alignItems: 'center', padding: 16 }}>
                                    <span style={{ color: 'var(--red)' }}><Icon name="check" /></span><b>{b}</b>
                                </div>
                            ))}
                        </div>
                        <span className="eyebrow">Syarat</span>
                        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                            {SYARAT.map((s) => (
                                <div key={s} className="row gap12" style={{ alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--red)', marginTop: 3 }}><Icon name="check" /></span><span>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {recruitmentOpen ? (
                        <div className="card pad" style={{ padding: 32 }}>
                            <h3 style={{ fontSize: '1.5rem' }}>Formulir Pendaftaran</h3>
                            <p className="muted" style={{ margin: '6px 0 22px' }}>
                                Isi data di bawah dengan benar. Tanda <span style={{ color: 'var(--red)' }}>*</span> wajib diisi.
                            </p>
                            <form onSubmit={submit}>
                                <div className="form-grid">
                                    <div className="field">
                                        <label className="label">Nama Lengkap <span className="req">*</span></label>
                                        <input className="input" value={data.nama} onChange={(e) => setData('nama', e.target.value)} placeholder="Nama kamu" />
                                        {errors.nama && <div className="err mt8">{errors.nama}</div>}
                                    </div>
                                    <div className="field">
                                        <label className="label">Email <span className="req">*</span></label>
                                        <input className="input" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="nama@email.com" />
                                        {errors.email && <div className="err mt8">{errors.email}</div>}
                                    </div>
                                    <div className="field">
                                        <label className="label">No. WhatsApp <span className="req">*</span></label>
                                        <input className="input" value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} placeholder="08xxxxxxxxxx" />
                                        {errors.whatsapp && <div className="err mt8">{errors.whatsapp}</div>}
                                    </div>
                                    <div className="field">
                                        <label className="label">Asal Institusi</label>
                                        <input className="input" value={data.institusi} onChange={(e) => setData('institusi', e.target.value)} placeholder="Sekolah / kampus / umum" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Divisi yang Diminati <span className="req">*</span></label>
                                    <select className="select" value={data.divisi_id} onChange={(e) => setData('divisi_id', e.target.value)}>
                                        <option value="">— Pilih divisi —</option>
                                        {divisi.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                    {errors.divisi_id && <div className="err mt8">{errors.divisi_id}</div>}
                                </div>
                                <div className="field">
                                    <label className="label">Motivasi Bergabung</label>
                                    <textarea className="textarea" value={data.motivasi} onChange={(e) => setData('motivasi', e.target.value)} placeholder="Ceritakan kenapa kamu ingin bergabung…" />
                                </div>
                                <label className="checkbox" style={{ margin: '6px 0 20px' }}>
                                    <input type="checkbox" required />
                                    <span>Saya menyetujui data saya disimpan & digunakan untuk proses pendaftaran sesuai kebijakan privasi Caraka Muda (UU PDP).</span>
                                </label>
                                <SubmitButton processing={processing} icon="join" className="btn btn-primary btn-lg btn-block">Kirim Pendaftaran</SubmitButton>
                            </form>
                        </div>
                    ) : (
                        <div className="card pad" style={{ padding: 40, textAlign: 'center' }}>
                            <div style={{ margin: '0 auto 16px', width: 72, height: 72, borderRadius: 22, background: 'var(--ink)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="cal" />
                            </div>
                            {(() => {
                                const copy = (CLOSED_COPY[recruitmentStatus] || CLOSED_COPY.closed)(opensAt);
                                return (
                                    <>
                                        <h3 style={{ fontSize: '1.5rem' }}>{copy.title}</h3>
                                        <p className="muted" style={{ maxWidth: 420, margin: '10px auto 22px' }}>{copy.desc}</p>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div></section>
        </PublicLayout>
    );
}
