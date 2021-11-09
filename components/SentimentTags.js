export default ({ tags }) => {
    const _tags = JSON.parse(tags)
    return (
        
        <div className="px-4" style={{ height: 200, overflow: 'auto' }}>
            <h3>Keywords - score </h3>
            <div className="row">
            {
                Object.keys(_tags).map(key => (
                    <div className="col-xl col-md-6 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="align-items-center row">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted mb-2">
                                            {key}
                                        </h6>
                                        <span className="h2 mb-0">{ (_tags[key].score / _tags[key].count).toFixed(2) }</span>
                                    </div>
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