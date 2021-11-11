export default ({ tags }) => {
    console.log({tags})
    if (!tags || tags.length === 0) return <></>
    return (
        <div className="px-4">
            <h3>Keywords - score </h3>
            <div className="sentiment-tags">
            {
                tags.map(tag => (
                    <div className="card">
                        <div className="card-body">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h6 className="text-uppercase text-muted">
                                        {tag.label}
                                    </h6>
                                    <span className="h2 mb-0">{tag.score.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}