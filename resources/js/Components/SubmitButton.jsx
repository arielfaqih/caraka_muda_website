import Icon from '@/Components/Icon';

export default function SubmitButton({ processing, icon = 'check', children, className = 'btn btn-primary btn-lg', ...props }) {
    return (
        <button disabled={processing} className={className} {...props}>
            <Icon name={processing ? 'spinner' : icon} className={processing ? 'spin' : ''} />
            {processing ? 'Memproses...' : children}
        </button>
    );
}
