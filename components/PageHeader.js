import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../pages/[slug]'

export default function PageHeader() {
    const company = useContext(Context)
    return (
        <div className="header page-header">
            <img className="header-img-top" 
            src={company.banner} 
            alt={company.name}
            onError={(e)=>{e.target.onerror = null; e.target.classList.add("unfound-banner") }} />
            <div className="container-fluid">
                <div className="header-body mt-n5 mt-sm-0 pt-0 position-relative" style={{ top: -18 }}>
                    <div className="align-items-start row px-lg-4 px-md-4 custom--header">
                        <div className="col-auto">
                            <div className="avatar avatar-xxl header-avatar-top">
                                <img
                                    className="avatar-img rounded-circle" alt=""
                                    src={company.logo}
                                    onError={(e)=>{e.target.onerror = null; e.target.classList.add("unfound-logo") }} />
                            </div>
                        </div>
                        <div className="mb-2 ms-n3 ms-md-n2 col-6 page__infos">
                            <h1 className="header-title">
                                {company.name} <i className="fas fa-badge-check"></i> <span className="mx-3"><i className="fas fa-ellipsis-h"></i></span>
                            </h1>
                            <p className="page__description">
                            {company.description && company.description.length > 120 ? company.description.substring(0, 120) + '...' : company.description}
                            </p>
                            <p className="page__infos slide">
                                {company.industries ? company.industries.map((item, index) => {
                                    return <span key={index}>{item} -</span>
                                }) : ''}                                
                                {company.location_address ? <span className="mx-1">{ company.location_address } </span> : '' }
                                {company.location_country_name ? <span>{ company.location_country_name } -</span> : '' }
                                {company.nb_employees ? <span className="mx-1"><i className="fal fa-users"></i> { company.nb_employees } people</span> : '' }
                                <span>- <i className="fal fa-user-tie"></i> <u className="mx-1">21 open positions</u></span>
                                
                            </p>
                            <p className="page__industries slide mb-0">
                            {company.industries ? company.industries.map((item, index) => {
                                return <span className="badge" key={index}>{item}</span>
                            }) : ''}
                            </p>
                        </div>
                        <div className="col page--infos--btns">
                            <button type="button" className="w-100 lift btn btn-primary">
                                <i className="fad fa-bell-plus"></i> Setup an alert
                            </button>
                            <button type="button" className="w-100 mt-3 lift btn btn-default">
                                <i className="fal fa-bookmark"></i> Add to list
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
