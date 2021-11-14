import { useState } from "react"
import Alert from "../components/Alert"
import DiffbotIndistriesSelect from "../components/DiffbotIndistriesSelect"
import Spinner from "../components/Spinner"
import GoogleSheetService from "../services/GoogleSheet.service"
import DiffbotService from "../services/Diffbot.service"

export default () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [selectedIndistry, setSelectedIndistry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const syncWithGoogleSheet = async () => {
    if (loading)
      return;
    try {
      setLoading(true)
      const service = new GoogleSheetService()
      await service.request('website', 3)
      setSuccess("Done 👍")
      setLoading(false)
    } catch (error) {
      setError(JSON.stringify(error))
      setLoading(false)
    }
  }
  const syncDiffbotCompanies = async () => {
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
      const {success, error} = await (await fetch(`/api/import-businesses${query}`)).json()
      if (!success)
        throw error
      setSuccess("Done 👍")
      setLoading(false)
    } catch (error) {
      setError(JSON.stringify(error))
      setLoading(false)
    }
  }
  return (
    <div className="p-4 db-sync-container">
      { success && <Alert type="success" message={success} onDelete={() => { setSuccess(null) }} /> }
      { error && <Alert type="danger" message={error} onDelete={() => { setError(null) }} /> }
      <div className="row">
        <div className="col col-6">
          <div className="card">
              <div className="card-body">
                  <div className="align-items-center row">
                      <div className="col text-center">
                        <button disabled={loading} type="button" className="btn btn-primary btn-lg" onClick={syncWithGoogleSheet}>
                          { loading ? <Spinner lignt={true} /> : 'Syncronize companies' }
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div className="col col-6">
          <div className="card">
              <div className="card-body">
                  <div className="align-items-center row">
                      <div className="col text-center">
                        <DiffbotIndistriesSelect onchange={(value) => { setSelectedIndistry(value.value) }} />
                        <input className="query-builder-operator form-control mb-3" placeholder="Year" type="number" min="1990" step="1" max="2021" onChange={(e) => { setSelectedYear(e.target.value) }} />
                        <input className="query-builder-operator form-control mb-3" placeholder="City name" onChange={(e) => { setSelectedCity(e.target.value) }} />
                        <button disabled={loading || selectedIndistry === '' || selectedCity === '' || selectedYear === ''} type="button" className="btn btn-primary btn-lg" onClick={syncDiffbotCompanies}>
                          { loading ? <Spinner lignt={true} /> : 'Import the result' }
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}