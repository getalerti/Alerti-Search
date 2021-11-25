import { useState, useEffect } from "react"
import AdminNavbar from "../../components/AdminNavbar"
import Alert from "../../components/Alert"
import CompanyForm from "../../components/CompanyForm"
import CompanyItem from '../../components/CompanyItem'
import Spinner from "../../components/Spinner"
import { authMiddleware, wrapAdminFetch } from "../../helpers/functions"

export default () => {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [limit, setLimit] = useState(20)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [displayFilters, setDisplayFilters] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    
    useEffect(() => { authMiddleware(true) }, [])

    const handleSearch = async () => {
        if (searchQuery && searchQuery.length >= 3) {
            setError(null)
            setLoading(true)
            const {success, results, message} = await (await wrapAdminFetch(`/api/admin/companies?s=${searchQuery}&limit=${limit}`, null, 'GET')).json()
            setLoading(false)
            if (!success) {
                setError(typeof message === 'object' ? JSON.stringify(message) : message)
            }
            if (results && results.length) {
                setCompanies(results)
            } else {
                setCompanies([])
            }
        } else {
            setCompanies([])
        }
    }
    const paging = (step) => {
        const newLimit = limit + (step * 20)
        if (companies.length <= 20 || loading || newLimit <= 20)
            return
        setLimit(page + (step * 20))
        handleSearch()
    }
    const verify = async (id, value) => {
        setError(null)
        setLoading(true)
        const {success, message} = await (await wrapAdminFetch(`/api/admin/companies?id=${id}`, {is_verified: value === true}, 'PUT')).json()
        setLoading(false)
        if (success) {
            handleSearch()
        }
        if (!success) {
            setError(typeof message === 'object' ? JSON.stringify(message) : message)
        }    
    }
    const apply = async (company) => {
        setLoading(true)
        let result = {}
        if (company.id)
            result = await (await wrapAdminFetch(`/api/admin/companies?id=${company.id}`, company, 'PUT')).json()
        else 
            result = await (await wrapAdminFetch(`/api/admin/companies`, company)).json()
        
        const {success, message} = result
        setLoading(false)
        if (success) {
            setSuccess("The operation completed successfully")
        } else {
            setError(typeof message === 'object' ? JSON.stringify(message) : message)
        }
    }
    const remove = async (id) => {
        const confirm = window.confirm("Confirm your choice please!")
        if (!confirm) return;
        setError(null)
        setLoading(true)
        const {success, message} = await (await wrapAdminFetch(`/api/admin/companies?id=${id}`, null, 'DELETE')).json()
        setLoading(false)
        if (success) {
            handleSearch()
        }
        if (!success) {
            setError(typeof message === 'object' ? JSON.stringify(message) : message)
        }  
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(handleSearch, 500)
        return () => clearTimeout(delayDebounceFn)
      }, [searchQuery])
    return (
        <>
            <div className="container">
                <AdminNavbar />
                {error && <Alert type="danger" message={error} />}
                {success && <Alert type="success" message={success} />}
                <div className="align-items-center row mb-4">
                    <div className="col">
                        <input placeholder="Linkedin Uri" type="text" className="form-control" />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" disabled={loading || true} onClick={() => {  }}>Add company (coming soon)</button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="input-group-merge input-group-flush input-group-reverse input-group">
                                <input placeholder="Search" type="search" className="form-control"  onChange={(e) => { setSearchQuery(e.target.value) }} />
                                <span className="input-group-text"><i className="far fa-search"></i></span></div>
                            </div>
                            <div className="col-auto">
                                <div className="dropdown-card dropdown">
                                    <button id="filter_companies" 
                                    onClick={() => { setDisplayFilters(!displayFilters) }}
                                    className="btn btn-white btn-sm btn btn-primary">
                                        <i className="fas fa-sliders-v"></i> Filter
                                    </button>
                                    <div x-placement="bottom-start" aria-labelledby="filter_companies" className="dropdown-menu"
                                        style={{ display: displayFilters ? 'block' : 'none' }}
                                        >
                                        <div className="card-header">
                                            <h4 className="card-header-title">Filters</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="list-group-flush mt-n4 mb-4 list-group">
                                                <div className="list-group-item">
                                                    Coming soon...
                                                </div>
                                            </div>
                                            <button type="button" className="w-100 btn btn-primary">Apply filter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="card-table table-nowrap table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Name</th>
                                    <th>Website</th>
                                    <th>Last update</th>
                                    <th>Is verified</th>
                                    <th>Source</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="fs-base">
                                {
                                    companies.map((company, index) => {
                                        return <CompanyItem 
                                                key={index} 
                                                item={company} 
                                                verify={() => { verify(company.id, !company.is_verified) }} 
                                                edit={() => { setSelectedCompany(company) }} 
                                                remove={() => { remove(company.id) }}  />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between card-footer">
                        <ul className="card-pagination pagination-tabs pagination">
                            <li className="ps-0 pe-0 border-end page-item">
                                <span className="page-link" role="button" onClick={() => { paging(-1) }} disabled={loading}>
                                    <i className="far fa-arrow-left"></i> Prev
                                </span>
                            </li>
                        </ul>
                        <ul className="card-pagination pagination-tabs pagination">
                            { loading && <Spinner light={true} />}
                        </ul>
                        <ul className="card-pagination pagination-tabs pagination">
                            <li className="ps-4 pe-0 border-start page-item">
                                <span className="page-link" role="button" onClick={() => { paging(1) }} disabled={loading}>
                                    Next <i className="far fa-arrow-right"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                selectedCompany && <div className="cusotm-modal">
                                <CompanyForm company={selectedCompany} close={() => {setSelectedCompany(null)}} loading={loading} apply={apply} />
                            </div>
            }
        </>
    )
}