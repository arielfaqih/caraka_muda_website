import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function GlobalLoader() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timeout;

        const removeStart = router.on('start', () => {
            // Small delay so quick navigations don't flash the modal.
            timeout = setTimeout(() => setShow(true), 150);
        });
        const removeFinish = router.on('finish', () => {
            clearTimeout(timeout);
            setShow(false);
        });

        return () => {
            clearTimeout(timeout);
            removeStart();
            removeFinish();
        };
    }, []);

    if (!show) return null;

    return (
        <div className="loader-overlay">
            <div className="loader-box">
                <div className="loader-orb">
                    <span className="loader-ring" />
                    <span className="loader-mark"><Icon name="logo" /></span>
                </div>
                <span className="loader-text">
                    Menyiapkan halaman
                    <span className="loader-dots"><i /><i /><i /></span>
                </span>
                <span className="loader-bar" />
            </div>
        </div>
    );
}
