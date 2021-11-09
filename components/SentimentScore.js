export default ({score}) => {
    const background = score > 70 ? '#27ae60' : (score >= 60 ? '#e67e22' : '#e74c3c')
    return (
        <div className="px-4">
            <div className="card">
                <div className="card-body">
                <div className="align-items-center row">
                    <div className="ms-n2 col">
                        <h4 className="mb-1 name"><a href="/project-overview">Sentiment score</a></h4>
                        <div className="align-items-center g-0 row">
                            <div className="col-auto">
                                <div className="small me-2">{score}%</div>
                            </div>
                            <div className="col">
                                <div className="progress-sm progress">
                                    <div role="progressbar" className="progress-bar" aria-valuenow={score} aria-valuemin="0"
                                        aria-valuemax="100" style={{ width: score+'%', backgroundColor: background }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}