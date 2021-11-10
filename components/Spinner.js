export default ({ lignt = false }) => (
    <div className={`${!lignt && 'p-4'} text-center`}>
        <div className="spinner-border"></div>
    </div>
)