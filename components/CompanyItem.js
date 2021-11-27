export default ({ item, verify, edit, remove }) => {
    const {name, website, timestamp, logo, source, is_verified} = item
    
    return (
        <tr>
            <td><img style={{ width: '25px', height: '25px' }} src={logo} /></td>
            <td>{ name }</td>
            <td>{ website }</td>
            <td>{ new Date(timestamp).toLocaleDateString() }</td>
            <td>
                <div className="form-check p-0 m-0 form-switch" style={{ width: 0}}>
                    <input type="checkbox" 
                    defaultChecked={is_verified == true} 
                    onClick={verify} 
                    className="form-check-input m-auto" />
                </div>
            </td>
            <td>{ source }</td>
            <td>
                <div className="actions-btns">
                    <button onClick={edit} className="btn-rounded-circle btn btn-white mx-2 btn-sm">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={remove} className="btn-rounded-circle btn btn-danger btn-sm">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
}