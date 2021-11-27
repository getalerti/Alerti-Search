import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { authMiddleware, wrapAdminFetch } from '../../helpers/functions'

export default function meilisearch() {
    useEffect(() => { authMiddleware() }, [])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [compniesName, setCompaniesName] = useState([])

    const sync = async () => {
      try {
        setLoading(true)
        const {success, results, message} = await (await wrapAdminFetch(`/api/admin/sync`, null, 'GET')).json()
        if (!success) throw message
        setCompaniesName(results)
        setSuccess('Done!')
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
              <div className="col mx-auto text-center">
                  <div className="card">
                      <div className="card-body">
                          <h3 className="text-uppercase text-muted mb-4">
                            Syncronize verifed companies
                          </h3>
                          <div className="w-50 mx-auto">
                            { success && <Alert type="success" message={success} onDelete={() => { setSuccess(null) }} /> }
                            { error && <Alert type="danger" message={error} onDelete={() => { setError(null) }} /> }
                            { compniesName.length ? <hr /> : '' }
                            {
                              compniesName.map((name, index) => <span key={index} class="rounded-pill badge bg-success mx-1">{name}</span>)
                            }
                            { compniesName.length ? <hr /> : '' }
                          </div>
                          <button type="button" className="btn btn-primary btn-lg w-50 mx-auto" onClick={sync}>
                            {
                              loading ? <Spinner light={true} /> : <><i className="fas fa-sync-alt"></i> Syncronize</>
                            }
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    )
}
