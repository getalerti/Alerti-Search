export default ({ title, image_url, snippet, onClick }) => {
    return (
        <div className="list-group-item">
            <div className="row">
            <div className="col-auto">
                <div className="avatar avatar-sm">
                    <img className="avatar-img rounded-circle" src={image_url} />
                </div>
            </div>
                <div className="ms-n2 col">
                    <h3>{title}</h3>
                    <div className="small">
                        {snippet}
                    </div>
                </div>
                <div className="col col-auto">
                    <button onClick={onClick} className="btn btn-link">
                        <i className="fas fa-external-link"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}