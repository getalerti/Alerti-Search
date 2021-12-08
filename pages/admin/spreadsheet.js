import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import Company from '../../models/Company'
import { authMiddleware, makeid, stringToSlug, wrapAdminFetch } from '../../helpers/functions'
import GoogleSheetService from '../../services/GoogleSheet.service'
const spreadsheetService = new GoogleSheetService()

export default function spreadsheet() {
    useEffect(() => { authMiddleware() }, [])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [spreadsheetID, setSpreadsheetID] = useState('')
    const [spreedsheetTitles, setSpreedsheetTitles] = useState([])
    const [spreedsheetCompany, setSpreedsheetCompany] = useState({})
    const [addedCompanies, setAddedCompanies] = useState([])
    const [notAddedCompanies, setNotAddedCompanies] = useState([])

    const addCompany = async (company) => {
        if (!company.name || company.name === '')
                throw `The name is empty`
        const result = await (await wrapAdminFetch(`/api/admin/companies`, { 
            pageUrl:  '',
            session: '',
            company
        })).json()
        const {success, message} = result
        if (success) {
            setAddedCompanies([...addedCompanies, company.name])
        } else {
            setNotAddedCompanies([...notAddedCompanies, company.name + `(${message})`])
        }
    }
    useEffect(() => {
        if (addedCompanies.length)
            setSuccess(addedCompanies.join(' - '))
        if (notAddedCompanies.length)
            setError(notAddedCompanies.join(' - '))
    }, [addedCompanies, notAddedCompanies])
    
    const save = async () => {
        setLoading(true)
        try {
            for (let index = 0; index < spreedsheetCompany.length; index++) {
                const _company = spreedsheetCompany[index];
                const company = {}
                Object.keys(_company).forEach(key => {
                    const index = spreedsheetTitles[key]
                    if (index !== '') {
                        company[index] = _company[key]
                    }
                })
                await addCompany(company)
            }
            setLoading(false)

        } catch (error) {
            setError(typeof error === "object" ? JSON.stringify(error) : error)
            setLoading(false)
        }
    }


    const mapping = (title, key) => {
        if (key === '-')
            return;
        const cloneSpreedsheetCompany = {...spreedsheetTitles}
        cloneSpreedsheetCompany[title] = key;
        console.log(cloneSpreedsheetCompany)
        setSpreedsheetTitles({
            ...cloneSpreedsheetCompany
        })
    }

    const load = async () => {
        if (spreadsheetID === '')
            return;
        setLoading(true)
        try {
            const { titles, companies } = await spreadsheetService.getTitles(spreadsheetID)
            setSpreedsheetCompany(companies)
            setSpreedsheetTitles(titles)
            setLoading(false)
        } catch (error) {
            setError(typeof error === "object" ? JSON.stringify(error) : error)
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <AdminNavbar />
            <div className="row">
            { success && <Alert type="success" message={success} onDelete={() => { setSuccess(null) }} /> }
            { error && <Alert type="danger" message={error} onDelete={() => { setError(null) }} /> }
                <div className="card">
                    <div className="card-header">
                        <input placeholder="Spreadsheet ID" 
                        type="text" 
                        onChange={(e) => { setSpreadsheetID(e.target.value) }}
                        className="form-control border-0" />
                        <button type="button" className="btn btn-white"
                        disabled={loading} 
                        onClick={load}>
                            { loading ? <Spinner light={true} /> : 'Load'  }
                        </button>
                    </div>
                </div>
                <div className="card p-4">
                    {
                        Object.keys(spreedsheetTitles).map((title, index) => (
                            <div className="form-group d-flex align-items-center justify-content-between" key={index}>
                                <label className="form-label mx-2">{title}</label>
                                <select className="form-control mx-2" 
                                style={{ width: 300 }}
                                onChange={(e) => { mapping(title, e.target.value) }}>
                                    <option value={'-'}>-</option>

                                    {
                                        Object.keys(Company).sort().map((key, index) => (
                                            <option key={index} value={key}>{key}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        ))
                    }
                    {
                        Object.keys(spreedsheetTitles).length ? <div className="form-group d-flex align-items-center justify-content-between">
                                                <label className="form-label mx-2">Verified</label>
                                                <div className="form-check p-0 m-0 form-switch">
                                                    <input type="checkbox" 
                                                    onChange={(e) => { mapping('verifed', e.target.checked) }}
                                                    className="form-check-input m-auto" />
                                                </div>

                                            </div> : ''
                    }
                    
                    {
                        Object.keys(spreedsheetTitles).length ? <button type="button" className="btn btn-white"
                            disabled={loading} 
                            onClick={save}>
                                { loading ? <Spinner light={true} /> : 'Import'  }
                            </button> : ''
                    }
                    
                </div>
            </div>
        </div>
    )
}
