import React, { useState } from 'react'
import { makeid, stringToSlug } from '../helpers/functions'
import Company from '../models/Company'
import Alert from './Alert'

export default function CompanyForm({ company, close, loading, apply }) {
    const [error, setError] = useState(null)
    if (!company) return <></>
    const hiddenFields = [
        'id','id_alerti', 'articles', 'specialisations', 'industries', 'timestamp', 'slug'
    ]
    const companyObject = { ...Company}
    const validation = (companyData) => {
        const {name, website} = companyData
        if (!name || name === "")
            throw 'The name is empty'
        if (!website || website === "")
            throw 'The website is empty'
        Object.keys(companyData).forEach(key => {
            if (key === 'id' || key === 'id_alerti') return true
            if (hiddenFields.indexOf(key) !== -1 || Object.keys(companyObject).indexOf(key) === -1)
                throw 'Error ' + key
        })
    }
    const submit = (e) => {
        e.preventDefault()
        const newCompany = {}
        // build
        Object.keys(companyObject).forEach(key => {
            if(key.indexOf('is_') === 0)
                newCompany[key] = document.getElementById(key) && document.getElementById(key).checked === true
            else
                newCompany[key] = e.target[key] ? e.target[key].value : null
        })

        // sanitize
        Object.keys(newCompany).forEach(key => {
            if (hiddenFields.indexOf(key) !== -1)
                delete newCompany[key]
        })  
        
        // send
        try {
            setError(null)
            validation(newCompany)
            if (company.id)
                newCompany.id = company.id
            if (company.id_alerti)
                newCompany.id_alerti = company.id_alerti
            else {
                newCompany.id_alerti = makeid('cmp_')
                newCompany.slug = stringToSlug(newCompany.name)
            }
            apply(newCompany)
        } catch (error) {
            setError(typeof message === 'object' ? JSON.stringify(message) : message)
        }
        
    }
    return (
        <form className="company-form" onSubmit={submit} method="POST">
            <button onClick={close} className="btn-rounded-circle btn btn-white d-block btn-sm mb-4 m-auto">
                <i className="fas fa-times"></i>
            </button>
            <div className="company__fields">
            { error && <Alert type="danger" message={error} /> }

            {
                Object.keys(companyObject).map((key, index) => {
                    if (hiddenFields.indexOf(key)  !== -1)
                        return null
                    if(key.indexOf('is_') === 0) {
                        return (
                            <div key={key} className="form-check form-switch my-1">
                                <input type="checkbox" name={key} id={key} defaultValue={company[key]} className="form-check-input" />
                                <label form={key} className="form-check-label">{key.replaceAll('_', ' ')}</label>
                            </div>
                        )
                    } 
                    else if (key === 'description') {
                            return (
                                <div className="mb-3 form-floating">
                                    <textarea name={key} defaultValue={company[key]}  placeholder={key.replaceAll('_', ' ')} id={key}
                                    className="form-control" ></textarea>
                                    <label htmlFor={key}>{key.replaceAll('_', ' ')}</label>
                                </div>
                            )                
                    }
                    else {
                        return (
                            <div className="mb-3 form-floating">
                                    <input name={key} defaultValue={company[key]}  placeholder={key.replaceAll('_', ' ')} type="text" id={key}
                                    className="form-control" />
                                <label htmlFor={key}>{key.replaceAll('_', ' ')}</label>
                            </div>
                        )
                    }
                })
            }
            </div>

            <button type="submit" className="btn btn-primary btn--apply" disabled={loading}>
                Apply
            </button>
        </form>
    )
}
