import { useState } from "react"
import Alert from "../components/Alert"
import Spinner from "../components/Spinner"
import GoogleSheetService from "../services/GoogleSheet.service"

export default () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

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
  const syncCSVGetProspect = () => {
    if (loading)
      return;
    setLoading(true)
  }
  return (
    <div className="p-4">
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
      </div>
    </div>
  )
}