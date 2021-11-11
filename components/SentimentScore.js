export default ({score}) => {
    const color = score > 0.7 ? '#27ae60' : (score >= 0.6 ? '#e67e22' : '#e74c3c')
    return (
        <div className="sentiment-score">
            <i class="fad fa-star" style={{ color: color }}></i>
            <h6 className="text-uppercase text-muted">Sentiment score</h6>
            <h2 className="mb-0" style={{ color: color }}>{score}</h2>
        </div>
    )
}