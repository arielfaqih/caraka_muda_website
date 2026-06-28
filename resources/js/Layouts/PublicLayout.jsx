import { Head, usePage } from '@inertiajs/react';
import NavBar from '@/Components/Public/NavBar';
import Ticker from '@/Components/Public/Ticker';
import Footer from '@/Components/Public/Footer';

export default function PublicLayout({ title, children, noTicker = false }) {
    const { flash } = usePage().props;
    const { url } = usePage();

    return (
        <>
            <Head title={title} />
            <NavBar />
            {!noTicker && <Ticker />}
            {flash?.success && (
                <div className="container mt16">
                    <div className="note">{flash.success}</div>
                </div>
            )}
            <main key={url} className="page-enter">{children}</main>
            <Footer />
        </>
    );
}
