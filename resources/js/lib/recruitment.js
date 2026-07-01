import { fmtDateTime } from '@/lib/format';

export const RECRUITMENT_CLOSED_COPY = {
    before_open: (opensAt) => ({
        title: 'Pendaftaran belum dibuka',
        desc: opensAt ? `Pendaftaran akan dibuka mulai ${fmtDateTime(opensAt)}. Pantau halaman ini ya!` : 'Pantau halaman ini untuk info pembukaan berikutnya.',
    }),
    after_close: () => ({
        title: 'Pendaftaran telah ditutup',
        desc: 'Periode pendaftaran kali ini sudah berakhir. Pantau halaman ini untuk info pembukaan berikutnya.',
    }),
    closed: () => ({
        title: 'Pendaftaran sedang ditutup',
        desc: 'Saat ini kami belum membuka rekrutmen. Pantau halaman ini untuk info pembukaan berikutnya.',
    }),
};

export function recruitmentClosedCopy(status, opensAt) {
    return (RECRUITMENT_CLOSED_COPY[status] || RECRUITMENT_CLOSED_COPY.closed)(opensAt);
}
