export default ({ type, message, onDelete }) => {
    return (
        <div role="alert" className={`fade alert alert-${type} alert-dismissible show`}>
            <button type="button" className="btn-close" aria-label="Close alert" onClick={onDelete}></button>
            <strong>{message}</strong>
        </div>
    )
}