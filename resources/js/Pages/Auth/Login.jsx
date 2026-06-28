import { Head, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import SubmitButton from '@/Components/SubmitButton';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '', password: '', remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route('login'), { onFinish: () => setData('password', '') });
    }

    return (
        <>
            <Head title="Masuk · Admin" />
            <section className="sec" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <div className="container" style={{ maxWidth: 420 }}>
                    <div className="card pad" style={{ padding: 36 }}>
                        <div className="brand-mark" style={{ marginBottom: 18, width: 54, height: 54 }}><Icon name="shield" /></div>
                        <h1 style={{ fontSize: '1.8rem' }}>Panel Pengurus</h1>
                        <p className="muted" style={{ margin: '6px 0 24px' }}>Masuk untuk mengelola konten Caraka Muda.</p>

                        {status && <div className="note mt8" style={{ marginBottom: 16 }}>{status}</div>}
                        {(errors.email || errors.password) && (
                            <div className="err">{errors.email || errors.password}</div>
                        )}

                        <form onSubmit={submit}>
                            <div className="field">
                                <label className="label">Email</label>
                                <input className="input" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="admin@carakamuda.org" autoFocus />
                            </div>
                            <div className="field">
                                <label className="label">Kata Sandi</label>
                                <input className="input" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="••••••••" />
                            </div>
                            <SubmitButton processing={processing} icon="logout" className="btn btn-primary btn-lg btn-block">Masuk</SubmitButton>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
