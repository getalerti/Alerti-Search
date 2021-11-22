import React, { useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import DiffbotIndistriesSelect from '../../components/DiffbotIndistriesSelect'
import Spinner from '../../components/Spinner'
import Select from 'react-select'
import Alert from '../../components/Alert'
import { sanitizeUrl } from '../../helpers/functions'

export default function Diffbot() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [selectedIndistry, setSelectedIndistry] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [done, setDone] = useState([])
    const [undone, setUndone] = useState([])

    const years = () => {
        const from = new Date().getFullYear() - 100
        const to = new Date().getFullYear()
        const list = []
        for (let index = to; index >= from; index--) {
            list.push({ value: index, label: index })
        }
        return list
    }
    const syncDiffbotCompanies = async () => {
        if (loading || selectedIndistry === '' || selectedCity === '' || selectedYear === '') return;
        if (loading)
        return;
        try {
        setLoading(true)
        const from = `${selectedYear}-01-01`
        const to = `${parseInt(selectedYear) + 1}-01-01`
        const industry = selectedIndistry
        const type = 'Organization'
        const city = selectedCity
        const query = `?action=diffbot&city=${city}&industry=${industry}&type=${type}&from=${from}&to=${to}`
        const {success, error, results} = await (await fetch(`/api/import-businesses${query}`)).json()
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
        <div className="container">
            <AdminNavbar />
            <Alert type="warning" message="The companies without a website or a name will be skipped by default" onDelete={null} />
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
                        onClick={syncDiffbotCompanies}>
                          { loading ? <Spinner light={true} /> : <span><i className="far fa-sync"></i> Import</span>  }
                        </button>
                    </div>
                  </div>
              </div>
          </div>
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
    )
}
