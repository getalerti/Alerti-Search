import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import Company from '../../models/Company'
import { authMiddleware, wrapAdminFetch } from '../../helpers/functions'
import GoogleSheetService from '../../services/GoogleSheet.service'

export default function spreadsheet() {
    useEffect(() => { authMiddleware() }, [])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [spreadsheetID, setSpreadsheetID] = useState('')
    const [spreedsheetTitles, setSpreedsheetTitles] = useState([])
    const [addedCompanies, setAddedCompanies] = useState([])
    const [notAddedCompanies, setNotAddedCompanies] = useState([])
    
    useEffect(() => {
        if (addedCompanies.length)
            setSuccess(addedCompanies.join(' - '))
        if (notAddedCompanies.length)
            setError(notAddedCompanies.join(' - '))
    }, [addedCompanies, notAddedCompanies])
    
    const save = async () => {
        setLoading(true)
        try {
            const { success, results, message} = await (await wrapAdminFetch(`/api/admin/companies`, { 
                source: 'spreadsheet',
                mapping: spreedsheetTitles,
                spreadsheetId: spreadsheetID
            })).json()
            if (success) {
                setAddedCompanies(results.done)
                setNotAddedCompanies(results.undone)
                setSpreedsheetTitles([])
            } else {
                throw message
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
        setSpreedsheetTitles({
            ...cloneSpreedsheetCompany
        })
    }

    const load = async () => {
        if (spreadsheetID === '')
            return;
        setLoading(true)
        setSpreedsheetTitles([])
        try {
            const { results} = await (await wrapAdminFetch(`/api/admin/companies`, { 
                source: 'spreadsheet',
                mapping: spreedsheetTitles,
                spreadsheetId: spreadsheetID,
                onlyTitles: true
            })).json()
            setSpreedsheetTitles(results.titles)
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
                        Object.keys(spreedsheetTitles).map((title, index) =>{
                            if (title === 'verified') {
                                return (
                                    <div className="form-group d-flex align-items-center justify-content-between" key={index}>
                                        <label className="form-label mx-2">Verified</label>
                                        <div className="form-check p-0 m-0 form-switch">
                                            <input type="checkbox" 
                                            onChange={(e) => { mapping('verified', e.target.checked) }}
                                            className="form-check-input m-auto" />
                                        </div>

                                    </div>
                                )
                            } else {
                                return (
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
                                )
                            }
                        })
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
