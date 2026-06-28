import { usePage } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function Ticker() {
    const { ticker } = usePage().props;

    if (!ticker?.length) return null;

    const items = ticker.map((t, i) => <span key={i} className="ticker-item"><b>{t}</b></span>);

    return (
        <div className="ticker">
            <div className="ticker-inner">
                <div className="ticker-label"><Icon name="mega" /> Kabar</div>
                <div className="ticker-track">{items}{items}</div>
            </div>
        </div>
    );
}
