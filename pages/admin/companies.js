import { useState, useEffect, useRef } from "react"
import AdminNavbar from "../../components/AdminNavbar"
import Alert from "../../components/Alert"
import CompanyForm from "../../components/CompanyForm"
import CompanyItem from '../../components/CompanyItem'
import DatePicker from "../../components/DatePicker"
import Spinner from "../../components/Spinner"
import { authMiddleware, isValidHttpUrl, wrapAdminFetch } from "../../helpers/functions"

export default () => {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [companyPage, setCompanyPage] = useState('')
    const [limit, setLimit] = useState(20)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [displayFilters, setDisplayFilters] = useState(false)
    const [displayLinkedinSession, setDisplayLinkedinSession] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const sessionInput = useRef(null)
    const verifiedFilterInput = useRef(null)
    const [selectDatePicker, setSelectDatePicker] = useState(false)
    const [dateRangeFilter, setDateRangeFilter] = useState(null)
    const [dateRangeFilterFrom, setDateRangeFilterFrom] = useState('')
    const [dateRangeFilterTo, setDateRangeFilterTo] = useState('')
    const [mode, setMode] = useState('SEARCH')
    
    useEffect(() => { 
        authMiddleware(true)
        getLinkedingSession() 
        init()
    }, [])
    useEffect(() => {
        if (
            dateRangeFilter
            && dateRangeFilter.startDate
            && dateRangeFilter.endDate
        ) {
            const from = new Date(dateRangeFilter.startDate)
            const to = new Date(dateRangeFilter.endDate)
            setDateRangeFilterFrom(from.getTime())
            setDateRangeFilterTo(to.getTime())
        }
    }, [dateRangeFilter])
    useEffect(() => {
        const delayDebounceFn = setTimeout(handleSearch, 500)
        return () => clearTimeout(delayDebounceFn)
      }, [searchQuery])

    useEffect(() => {
        if (mode === 'SEARCH') handleSearch()
        if (mode === 'FILTRE') applyFilters()
    }, [limit])
    const init = () => {
        const isVerified = '&verified=' + (verifiedFilterInput.current.checked === true ? 'true' : 'false')
        getCompanies(null, isVerified)
    }
    const getLinkedingSession = () => {
        if (typeof window === "undefined")
            return null
        const session = window.localStorage.getItem('linkedinSession')
        setDisplayLinkedinSession(!session || session === '-')
        sessionInput.current.value = session || ''
        return session
    }
    const getCompanies = async (searchQuery, withFilters = '') => {
        setCompanyPage([])
        setError(null)
        setLoading(true)
        const {success, results, message} = await (await wrapAdminFetch(`/api/admin/companies?${searchQuery ? ('s='+searchQuery) : ''}${withFilters}&limit=${limit}`, null, 'GET')).json()
        setLoading(false)
        if (!success) {
            setError(typeof message === 'object' ? JSON.stringify(message) : message)
        }
        if (results && results.length) {
            setCompanies(results)
        } else {
            setCompanies([])
        }
    }
    const applyFilters = () => {
        const from = dateRangeFilterFrom ? '&from='+dateRangeFilterFrom : ''
        const to = dateRangeFilterTo ? '&to='+dateRangeFilterTo : ''
        const isVerified = '&verified=' + (verifiedFilterInput.current.checked === true ? 'true' : 'false')
        const query = `&${from}${to}${isVerified}`
        setMode('FILTRE')
        getCompanies(null, query)
        setDisplayFilters(false)
    }
    const handleSearch = async () => {
        try {
            setMode('SEARCH')
            if (searchQuery && searchQuery.length >= 3) {
                getCompanies(searchQuery, '', limit)
            } else {
                setCompanies([])
            }
        } catch (error) {
            setLoading(false)
            setError(typeof error === 'object' ? JSON.stringify(error) : error)
        }
    }
    const paging = (step) => {
        if (loading) return
        if (step === 1 && companies.length <= 20)
            return
        const newLimit = limit + (step * 20)
        if (newLimit < 0) return;
        setLimit(newLimit)
    }
    const verify = async (id, value) => {
        try {
            setError(null)
            setLoading(true)
            const {success, message} = await (await wrapAdminFetch(`/api/admin/companies?id=${id}`, {is_verified: value === true, verification_date: value === true ? Date.now() : null}, 'PUT')).json()
            setLoading(false)
            if (success) {
                if (mode === 'SEARCH') handleSearch()
                if (mode === 'FILTRE') applyFilters()
            }
            if (!success) {
                setError(typeof message === 'object' ? JSON.stringify(message) : message)
            }  
        } catch (error) {
            setLoading(false)
            setError(typeof error === 'object' ? JSON.stringify(error) : error)
        }  
    }
    const apply = async (company) => {
        try {
            setLoading(true)
            let result = {}
            if (company.id)
                result = await (await wrapAdminFetch(`/api/admin/companies?id=${company.id}`, company, 'PUT')).json()
            else {
                if(!isValidHttpUrl(companyPage) || !sessionInput.current.value) 
                    throw 'Params invalid'
                result = await (await wrapAdminFetch(`/api/admin/companies`, { 
                    pageUrl:  companyPage,
                    session: sessionInput.current.value
                })).json()
            }
            
            const {success, message} = result
            setLoading(false)
            if (success) {
                setSuccess("The operation completed successfully")
            } else {
                setError(typeof message === 'object' ? JSON.stringify(message) : message)
            }
        } catch (error) {
            setLoading(false)
            setError(typeof error === 'object' ? JSON.stringify(error) : error)
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
    return (
        <>
            <div className="container">
                <AdminNavbar />
                {error && <Alert type="danger" message={error} onDelete={() => { setError(null) }} />}
                {success && <Alert type="success" message={success} onDelete={() => { setSuccess(null) }} />}
                <div className="align-items-start row mb-4">
                    <div className="col">
                        <input placeholder="Linkedin Uri" type="text" className="form-control" 
                        onChange={(e) => { setCompanyPage(e.target.value) }} />
                        <button className="btn m-0 px-0 pt-3"
                            onClick={() => {setDisplayLinkedinSession(!displayLinkedinSession)}}>Cookies session 
                            <i className={`px-3 fas fa-chevron-${displayLinkedinSession ? 'up' : 'down'}`}></i>
                        </button>
                        <div className={`collapse ${displayLinkedinSession && 'show'}`}>
                            <input placeholder="Cookies session" type="text" className="form-control" 
                            ref={sessionInput}
                            onBlur={(e) => { window.localStorage.setItem('linkedinSession', e.target.value) }} />
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" disabled={loading ||companyPage === ''} onClick={() => { apply({}) }}>Add company</button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="input-group-merge input-group-flush input-group-reverse input-group">
                                <input placeholder="Search" type="search" className="form-control" onChange={(e) => { setSearchQuery(e.target.value) }} />
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
                                                    <div className="d-inline form-check form-switch">
                                                    Verified 

                                                    <input type="checkbox" 
                                                    defaultChecked={false}
                                                    ref={verifiedFilterInput} 
                                                    className="form-check-input m-auto float-none mx-3" />
                                                    </div>
                                                    <hr />
                                                    { dateRangeFilterFrom && new Date(dateRangeFilterFrom).toDateString() + ' - ' }
                                                    { dateRangeFilterTo && new Date(dateRangeFilterTo).toDateString() }
                                                    <button className="btn btn-white d-block mx-auto" onClick={() => { setSelectDatePicker(true) }}>
                                                        <i className="fad fa-calendar-day"></i>  Select creation date
                                                    </button>
                                                </div>
                                            </div>
                                            <button type="button" onClick={applyFilters} className="w-100 btn btn-primary">Apply filter</button>
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
                                    <th>Created</th>
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
            {
                selectDatePicker && <div className="cusotm-modal">

                    <button type="button" className="btn-rounded-circle btn btn-white mb-4" 
                        onClick={() => { setSelectDatePicker(false) }}>
                        <i className="far fa-times"></i>
                    </button>
                                <DatePicker handleSelect={setDateRangeFilter} />
                                <button type="button" className="btn btn-white mt-4" 
                                    onClick={() => { setSelectDatePicker(false) }}>
                                    Apply
                                </button>
                            </div>
            }
            
        </>
    )
}