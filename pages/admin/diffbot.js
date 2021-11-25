import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import DiffbotIndistriesSelect from '../../components/DiffbotIndistriesSelect'
import Spinner from '../../components/Spinner'
import Select from 'react-select'
import Alert from '../../components/Alert'
import { authMiddleware, sanitizeUrl, wrapAdminFetch } from '../../helpers/functions'
import Logs from '../../components/Logs'

export default function Diffbot() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [oldRequest, setOldRequest] = useState(false)
    const [error, setError] = useState(null)
    const [selectedIndistry, setSelectedIndistry] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [done, setDone] = useState([])
    const [undone, setUndone] = useState([])
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => { authMiddleware() }, [])

    const years = () => {
        const from = new Date().getFullYear() - 100
        const to = new Date().getFullYear()
        const list = []
        for (let index = to; index >= from; index--) {
            list.push({ value: index, label: index })
        }
        return list
    }
    const checkHistory = async (inputs) => {
        const {results} = await (await wrapAdminFetch(`/api/admin/logs?s=${inputs}operation=DIFFBOT_REQUEST&exist=true`, null, 'GET')).json()
        return results
    }
    const syncDiffbotCompanies = async (check = false) => {
        if (loading || selectedIndistry === '' || selectedCity === '' || selectedYear === '') return;
        if (loading)
            return;
        try {
        setLoading(true)
        setOldRequest(false)
        const from = `${selectedYear}-01-01`
        const to = `${parseInt(selectedYear) + 1}-01-01`
        const industry = selectedIndistry
        const type = 'Organization'
        const city = selectedCity.toLowerCase()
        const query = `?action=diffbot&city=${city}&industry=${industry}&type=${type}&from=${from}&to=${to}`
        if (check) {
            const results = await checkHistory(JSON.stringify({type, industry, city, from, to}), true)
            if (results) {
                setLoading(false)
                setOldRequest(true)
                return;
            }
        }
        const {success, error, results} = await (await wrapAdminFetch(`/api/admin/import-businesses${query}`, null, 'GET')).json()
        if (!success)
            throw error
        setSuccess("Done 👍")
        setLoading(false)
        setDone(results.done)
        setUndone(results.undone)
        } catch (error) {
            setError(JSON.stringify(error))
            setLoading(false)
        }
    }
    return (
        <>
            <div className="container">
                <AdminNavbar />
                <Alert type="info" message="The companies without a website or a name will be skipped by default" onDelete={null} />
                { success && <Alert type="success" message={success} onDelete={() => { setSuccess(null) }} /> }
                { error && <Alert type="danger" message={error} onDelete={() => { setError(null) }} /> }
                <div className="card admin-diffbot--header">
                <div className="card-body">
                    <div className="align-items-center justify-items-center row">
                        <div className="col">
                            <DiffbotIndistriesSelect onchange={(value) => { setSelectedIndistry(value.value) }} />
                        </div>
                        <div className="col">
                            <Select options={years()} className="custom-select mb-3" styles={{ textAlign: 'left' }} onChange={(value) => { setSelectedYear(value.value) }} />
                        </div>
                        <div className="col">
                            <input className="query-builder-operator form-control mb-3" placeholder="City name" onChange={(e) => { setSelectedCity(e.target.value) }} />
                        </div>
                        <div className="col buttons">
                            <button disabled={loading || selectedIndistry === '' || selectedCity === '' || selectedYear === ''} 
                            type="button" 
                            className="btn btn-primary btn-sm mb-3" 
                            onClick={() => { syncDiffbotCompanies(true) }}>
                            { loading ? <Spinner light={true} /> : <span><i className="far fa-sync"></i> Import</span>  }
                            </button>

                            <button type="button" 
                            className="btn btn-info btn-sm mb-3 mx-2" 
                            onClick={() => { setShowHistory(true) }}>
                            { loading ? <Spinner light={true} /> : <span><i class="fas fa-history"></i> History</span>  }
                            </button>
                        </div>
                    </div>
                </div>
                {
                    oldRequest && (
                        <div className="card admin-diffbot--header alert-warning m-4">
                            <div className="card-body">
                                This request is already processed, do you want to re-process it again ?
                                <button disabled={loading || selectedIndistry === '' || selectedCity === '' || selectedYear === ''} 
                                type="button" 
                                className="btn bg-white btn-sm mx-3" 
                                onClick={() => { syncDiffbotCompanies(false) }}>
                                { loading ? <Spinner light={true} /> : <span><i className="far fa-thumbs-up"></i> Yes</span>  }
                                </button>
                                <button 
                                type="button" 
                                className="btn bg-white btn-sm mx-3" 
                                onClick={() => { setOldRequest(false) }}>
                                { loading ? <Spinner light={true} /> : <span><i className="far fa-thumbs-down"></i> No</span>  }
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <p>{ done.length } companies <span className="badge bg-success">imported</span> - { undone.length } companies <span className="badge bg-danger">not imported</span></p>
            <table className="card-table table-nowrap table table-sm table-hover">
                {
                    done.map(({ name, website}, index) => (
                        <tr key={index}>
                            <td className="p-2">
                                { name }
                            </td>
                            <td><a href={sanitizeUrl(website)} target="_blank">{website}</a></td>
                            <td><span className="badge bg-success p-1">Saved</span></td>
                        </tr>
                    ))
                }
                {
                    undone.map(({ name, website}, index) => (
                        <tr key={index} className="p-2">
                            <td className="p-2">
                                { name }
                            </td>
                            <td><a href={sanitizeUrl(website)} target="_blank">{website}</a></td>
                            <td><span className="badge bg-danger p-1">unsaved</span></td>
                        </tr>
                    ))
                }
            </table>
            </div>
            { showHistory && (
                <div className="cusotm-modal">
                    <button type="button" className="btn-rounded-circle btn btn-white mb-4" 
                        onClick={() => { setShowHistory(false) }}>
                        <i className="far fa-times"></i>
                    </button>
                    <Logs operation='DIFFBOT_REQUEST' />
                </div>
            ) }
        </>
    )
}
