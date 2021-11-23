import React, { useState, useEffect } from 'react'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { wrapAdminFetch } from '../../helpers/functions'
import SupabaseService from '../../services/Supabase.service'

export default function auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const service = new SupabaseService()

    const auth = async () => {
      if (email.trim() === '' || password.trim() === '' || loading) return;
      setLoading(true)
      const{success, results, message} = await (await wrapAdminFetch(`/api/admin/auth`, {email, password})).json()
      setLoading(false)
      if (!success) {
        setError(message)
        return
      }
      window.localStorage.setItem('supabase.auth.token', JSON.stringify({
      currentSession: results,
      expiresAt: Date.now() * 60 * 60 * 60 * 60 * 60
      }))
      window.location.href = '/admin/companies'
    }
    useEffect(async () => {
        const session = await service.supabase.auth.user()
        if (session) {
            window.location.href = '/admin/companies'
        }
    }, [])
    return (
        <div className="px-6 my-5 mx-auto col-xl-4 col-lg-6 col-md-5 col-12">
            <h1 className="display-4 text-center mb-3">Sign in</h1>
            <p className="text-muted text-center mb-5">Access to the admin dashboard</p>
            { error && <Alert type="danger" message={error} /> }
            <div className="form-group"><label className="form-label">Email Address</label>
                    <input placeholder="name@address.com"
                            onChange={(e) => {setEmail(e.target.value)}} 
                            type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col"><label className="form-label">Password</label></div>
                    </div>
                    <div className="input-group-merge input-group">
                        <input placeholder="Enter your password"
                            onChange={(e) => {setPassword(e.target.value)}} 
                            type="password"
                            className="form-control" />
                        <span className="input-group-text"><i className="fal fa-eye"></i></span>
                    </div>
                </div>
            <button type="button" className="w-100 mb-3 btn btn-primary btn-lg" 
            disabled={email.trim() === '' || password.trim() === ''}
            onClick={auth}>
              { loading ? <Spinner light={true} /> : 'Sign in'}
            </button>
        </div>
    )
}
