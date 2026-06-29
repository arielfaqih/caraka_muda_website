import { Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function Footer() {
    return (
        <footer className="foot">
            <div className="container">
                <div className="foot-grid">
                    <div>
                        <div className="row gap8">
                            <div className="brand-mark" style={{ width: 38, height: 38 }}><Icon name="logo" /></div>
                            <div className="brand-name">Caraka<span style={{ color: 'var(--red)' }}>Muda</span></div>
                        </div>
                        <p className="mt16" style={{ fontSize: '.9rem', maxWidth: 280 }}>
                            Organisasi kepemudaan yang bergerak lewat aksi nyata, kolaborasi, dan kepedulian sosial.
                        </p>
                        <div className="foot-social">
                            <a href="#" aria-label="Instagram"><Icon name="ig" /></a>
                            <a href="#" aria-label="WhatsApp"><Icon name="wa" /></a>
                            <a href="#" aria-label="YouTube"><Icon name="yt" /></a>
                        </div>
                    </div>
                    <div>
                        <h4>Jelajahi</h4>
                        <Link href={route('tentang')}>Tentang</Link>
                        <Link href={route('program')}>Program</Link>
                        <Link href={route('berita.index')}>Berita</Link>
                        <Link href={route('kegiatan.index')}>Kegiatan</Link>
                    </div>
                    <div>
                        <h4>Informasi</h4>
                        <Link href={route('transparansi')}>Transparansi</Link>
                        <Link href={route('faq')}>FAQ</Link>
                        <Link href={route('kontak')}>Kontak</Link>
                    </div>
                    <div>
                        <h4>Pengurus</h4>
                        <p style={{ fontSize: '.9rem' }}>Pendaftaran anggota baru diumumkan lewat Berita.</p>
                    </div>
                </div>
                <div className="foot-bottom">
                    <span>&copy; {new Date().getFullYear()} Caraka Muda. Semua hak cipta dilindungi.</span>
                </div>
            </div>
        </footer>
    );
}
