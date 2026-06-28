import { Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function Breadcrumb({ items }) {
    return (
        <div className="breadcrumb">
            <Link href={route('beranda')}>Beranda</Link>
            {items.map((item, i) => (
                <span key={i} className="row gap8">
                    <Icon name="chev" />
                    {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                </span>
            ))}
        </div>
    );
}
