export default ({ light = false }) => (
    <div className={`${!light && 'p-4'} text-center`}>
        <div className="spinner-border"></div>
    </div>
)