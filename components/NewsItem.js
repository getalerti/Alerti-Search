export default ({ title, url, image_url, snippet }) => {
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
                    <a href={url} target="_blank">
                        <i className="fas fa-external-link"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}