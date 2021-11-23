import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { authMiddleware, wrapAdminFetch } from '../../helpers/functions'
import SupabaseService from '../../services/Supabase.service'

export default function users() {
    useEffect(() => { authMiddleware() }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const signup = async () => {
       if(email.trim() === '' || password.trim() === '' || name.trim() === '' || loading) return
       const service = new SupabaseService()
       setLoading(true)
       const { error } = await service.supabase.auth.signUp(
          {
            email,
            password,
          },
          {
            data: { 
              name, 
            }
          }
        )
          
       setLoading(false)
       if (error)
        setError(error.message)
       else 
        setSuccess('✅ The user will recieve a confirmation email.')
    }
    return (
        <div className="container">
            <AdminNavbar />
            <div className="my-5 mx-auto col-xl-4 col-lg-8 col-md-8 col-12">
            <h1 className="display-4 text-center mb-3">New user</h1>
            <p className="text-muted text-center mb-5">Add new user</p>
            { error && <Alert type="danger" message={error} /> }
            {success && <Alert type="success" message={success} /> }
            <div className="form-group"><label className="form-label">Full name</label>
                <input placeholder="Joe Person"
                        onChange={(e) => {setName(e.target.value)}} 
                        type="text" className="form-control" />
            </div>
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
            disabled={email.trim() === '' || password.trim() === '' || name.trim() === ''}
            onClick={signup}>
              {loading ? <Spinner light={true} /> : 'Add'}
            </button>
        </div>
        </div>
    )
}
