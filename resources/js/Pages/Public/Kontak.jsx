import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Kontak({ settings }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '', email: '', subjek: '', pesan: '',
    });
    const contact = settings.contact || {};
    const wa = contact.whatsapp ? `https://wa.me/62${contact.whatsapp.replace(/\D/g, '').replace(/^0/, '')}` : null;

    function submit(e) {
        e.preventDefault();
        post(route('kontak.store'), { onSuccess: () => reset() });
    }

    return (
        <PublicLayout title="Kontak">
            <section className="sec"><div className="container">
                <Breadcrumb items={[{ label: 'Kontak' }]} />
                <SectionHead eyebrow="Hubungi Kami" title="Sapa kami, kapan saja" />

                <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
                    <div style={{ display: 'grid', gap: 14 }}>
                        {wa && (
                            <a className="card pad doc-item" href={wa} target="_blank" rel="noreferrer">
                                <div className="doc-ic"><Icon name="wa" /></div>
                                <div className="info"><h4>WhatsApp</h4><div className="sub">{contact.whatsapp} · klik untuk chat</div></div>
                                <Icon name="arrow" />
                            </a>
                        )}
                        {contact.email && (
                            <a className="card pad doc-item" href={`mailto:${contact.email}`}>
                                <div className="doc-ic"><Icon name="mail" /></div>
                                <div className="info"><h4>Email</h4><div className="sub">{contact.email}</div></div>
                                <Icon name="arrow" />
                            </a>
                        )}
                        {contact.address && (
                            <div className="card pad doc-item">
                                <div className="doc-ic"><Icon name="pin" /></div>
                                <div className="info"><h4>Sekretariat</h4><div className="sub">{contact.address}</div></div>
                            </div>
                        )}
                    </div>

                    <div className="card pad" style={{ padding: 32 }}>
                        <h3 style={{ fontSize: '1.4rem' }}>Kirim Pesan</h3>
                        <p className="muted" style={{ margin: '6px 0 20px' }}>Kami biasanya membalas dalam 1–2 hari kerja.</p>
                        <form onSubmit={submit}>
                            <div className="field">
                                <label className="label">Nama <span className="req">*</span></label>
                                <input className="input" value={data.nama} onChange={(e) => setData('nama', e.target.value)} placeholder="Nama kamu" />
                                {errors.nama && <div className="err mt8">{errors.nama}</div>}
                            </div>
                            <div className="field">
                                <label className="label">Email <span className="req">*</span></label>
                                <input className="input" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="nama@email.com" />
                                {errors.email && <div className="err mt8">{errors.email}</div>}
                            </div>
                            <div className="field">
                                <label className="label">Subjek</label>
                                <input className="input" value={data.subjek} onChange={(e) => setData('subjek', e.target.value)} placeholder="Tentang apa?" />
                            </div>
                            <div className="field">
                                <label className="label">Pesan <span className="req">*</span></label>
                                <textarea className="textarea" value={data.pesan} onChange={(e) => setData('pesan', e.target.value)} placeholder="Tulis pesanmu di sini…" />
                                {errors.pesan && <div className="err mt8">{errors.pesan}</div>}
                            </div>
                            <SubmitButton processing={processing} icon="mail" className="btn btn-primary btn-lg btn-block">Kirim Pesan</SubmitButton>
                        </form>
                    </div>
                </div>
            </div></section>
        </PublicLayout>
    );
}
