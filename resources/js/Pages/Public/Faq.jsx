import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHead from '@/Components/Public/SectionHead';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import Icon from '@/Components/Icon';

export default function Faq({ faq }) {
    const [open, setOpen] = useState(null);

    return (
        <PublicLayout title="FAQ">
            <section className="sec"><div className="container" style={{ maxWidth: 780 }}>
                <Breadcrumb items={[{ label: 'FAQ' }]} />
                <SectionHead eyebrow="Tanya Jawab" title="Pertanyaan yang sering muncul" center />

                <div>
                    {faq.map((f, i) => (
                        <div key={f.id} className={`acc ${open === i ? 'open' : ''}`}>
                            <button className="acc-q" onClick={() => setOpen(open === i ? null : i)}>
                                <span>{f.q}</span>
                                <span className="ic"><Icon name="plus" /></span>
                            </button>
                            {open === i && <div className="acc-a-in">{f.a}</div>}
                        </div>
                    ))}
                    {!faq.length && <p className="muted">Belum ada pertanyaan.</p>}
                </div>

                <div className="center mt32">
                    <Link href={route('kontak')} className="btn btn-primary"><Icon name="mail" /> Masih ada pertanyaan? Hubungi kami</Link>
                </div>
            </div></section>
        </PublicLayout>
    );
}
