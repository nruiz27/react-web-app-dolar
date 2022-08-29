export default function Info({ text, type = 'info' })
{
    return (
        <span className={ type === 'danger' ? "form-text text-danger" : "form-text help-block" }>
            <span className="btn-icon"><i className={ type === 'danger' ? "la la-warning" : "la la-info" }></i></span> { text }
        </span>
    );
}