export default function SectionHead({ eyebrow, title, center = false }) {
    return (
        <div className={`sec-head ${center ? 'mid' : ''}`}>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
        </div>
    );
}
