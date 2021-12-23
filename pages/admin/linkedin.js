import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { authMiddleware, wrapAdminFetch } from '../../helpers/functions'
import linkedinProfiles from './../../helpers/linkedin_profiles.json'

export default function linkedin() {
    useEffect(() => { authMiddleware() }, [])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [session, setSession] = useState("")
    const [spreadsheetId, setSpreadsheetId] = useState("")

    useEffect(() => {
        const storedSession = window.localStorage.getItem('linkedin_session') || ''
        setSession(storedSession)
        const storedSpreadsheetID = window.localStorage.getItem('linkedin_spreadsheet_id') || ''
        setSpreadsheetId(storedSpreadsheetID)
    }, [])
    useEffect(() => {
        window.localStorage.setItem('linkedin_session', session)
        window.localStorage.setItem('linkedin_spreadsheet_id', spreadsheetId)
    }, [session, spreadsheetId])
    
    const update = async (e) => {
        try {
            setSuccess(null)
            setError(null)
            e.preventDefault()
            setLoading(true)
            if (!session || !spreadsheetId) throw 'Session is empty'
            const { success, message } = await (await wrapAdminFetch(`/api/admin/linkedin?spreadsheetId=${spreadsheetId}&session=${session}`, null, 'GET')).json()
            setLoading(false)
            if (!success) {
                setError(message)
            } else {
                setSuccess('DONE !')
            }
        } catch (error) {
            setError(typeof error === "object" ? JSON.stringify(error) : error)
            setLoading(false)
        }

    }
    return (
        <div className="container">
            <AdminNavbar />
            <div className="row">
            <Alert type="warning" message="Please don't use the same session for more than 200 organizations, this could restrict the linkedin account." />
            { success && <Alert type="success" message={success} onDelete={() => { setSuccess(null) }} /> }
            { error && <Alert type="danger" message={error} onDelete={() => { setError(null) }} /> }
                <div className="card p-4">
                        <input type="text" 
                            defaultValue={session} 
                            placeholder="Session value" 
                            className="form-control mb-4"
                            onChange={(e) => { setSession(e.target.value); } } />
                        <input type="text" 
                            defaultValue={spreadsheetId} 
                            placeholder="Spreadsheet ID" 
                            className="form-control mb-4"
                            onChange={(e) => { setSpreadsheetId(e.target.value); } } />
                        <button type="button" 
                            className="btn btn-primary"
                            disabled={loading || !session || !spreadsheetId} 
                            onClick={update}>
                                { loading ? <Spinner light={true} /> : 'Go!'  }
                        </button>
                </div>
            </div>
        </div>
    )
}
