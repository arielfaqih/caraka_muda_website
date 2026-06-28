const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export function fmtDate(value) {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '—';
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function initials(name) {
    const parts = String(name || '?').trim().split(/\s+/);
    return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
}

const GRADIENTS = [
    ['#c8313f', '#7a1620'],
    ['#dd636e', '#a91f2c'],
    ['#8a1722', '#c8313f'],
    ['#a91f2c', '#5c131a'],
];

export function gradient(seed = 0) {
    const [a, b] = GRADIENTS[Math.abs(seed) % GRADIENTS.length];
    return `linear-gradient(135deg, ${a}, ${b})`;
}

export function personPhoto(seed = 0, size = 120) {
    const id = (Math.abs(seed) % 70) + 1;
    return `https://i.pravatar.cc/${size}?img=${id}`;
}
