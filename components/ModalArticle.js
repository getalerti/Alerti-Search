import SentimentScore from "./SentimentScore";
import SentimentTags from "./SentimentTags";
import Spinner from "./Spinner";

export default ({ title, content, hide, onClose, tags, sentiment }) => {
    if (hide) return <></>;
    return (
        <div className="modal-dialog modal-custom">
            <div className="modal-content">
                <div className="modal-card">
                    <div className="card-header border-none">
                        <h4 className="card-header-title">{title}</h4>
                        <button type="button" className="btn-close" onClick={onClose } aria-label="Close"></button>
                    </div>
                    <div className="custom-modal-content">
                        <SentimentScore score={sentiment} />
                        <SentimentTags tags={tags} />
                        { content === '...' ? <Spinner /> : (
                            <div className="custom-modal-content--content" dangerouslySetInnerHTML={{ __html: content }}></div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}