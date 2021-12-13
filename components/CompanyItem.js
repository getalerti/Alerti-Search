import { useEffect, useState } from "react"
import { getCompanyFromObject, isValidHttpUrl, sanitizeUrl } from "../helpers/functions"
import AlertiLeadsService from "../services/AlertiLeads.service"
import Spinner from "./Spinner"

export default ({ item, verify, edit, remove, update, setError }) => {
    const {id, name, website, timestamp, logo, source, is_verified} = item
    const [verifed, setVerified] = useState(is_verified == true)
    const [loading, isLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const service = new AlertiLeadsService()
    
    useEffect(() => {
        setVerified(is_verified == true)
    }, [item])
    const loadSocialMedia = async () => {
        const url = sanitizeUrl(website);
        if (loading || !isValidHttpUrl(url))
            return;
        try {
            isLoading(true);
            const { data } = await service.retrieveSocialMedia(url); 
            const company = getCompanyFromObject(data)
            company.id = id
            update(company)
        } catch (error) {
            setError('Technical Error')
            console.log({loadSocialMediaError: error})
            isLoading(false); 
        }

    }
    return (
        <tr>
            <td><img style={{ width: '25px', height: '25px' }} src={logo} /></td>
            <td>{ name }</td>
            <td>{ website }</td>
            <td>{ new Date(timestamp).toLocaleDateString() }</td>
            <td>
                <div className="form-check p-0 m-0 form-switch" style={{ width: 0}}>
                    <input type="checkbox" 
                    checked={verifed} 
                    onChange={verify} 
                    className="form-check-input m-auto" />
                </div>
            </td>
            <td>{ source }</td>
            <td>
                <div className="actions-btns">
                    <button onClick={edit} className="btn-rounded-circle btn btn-white mx-2 btn-sm border-0">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={remove} className="btn-rounded-circle btn btn-danger btn-sm border-0">
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="btn-rounded-circle btn btn-default btn-sm position-relative border-0">
                        <i className="fas fa-ellipsis-v" 
                    onClick={() => { setShowDropdown(!showDropdown) }}></i>
                        <div className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} 
                            data-popper-reference-hidden="false" data-popper-escaped="false"
                            data-popper-placement="bottom-end">
                                <button className="dropdown-item" disabled={loading}>
                                    {loading ? <Spinner light={true} /> : 'Load metadata'}
                                </button>
                                <button className="dropdown-item" 
                                    onClick={loadSocialMedia} 
                                    disabled={loading || !website}>
                                    {loading ? <Spinner light={true} /> : 'Load social networks'}
                                </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}