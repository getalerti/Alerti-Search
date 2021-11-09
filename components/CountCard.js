import React from 'react'

export default function CountCard({ name, value, icon = "", iconType }) {
    if (value === '' || value === '-')
        return <></>
    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <div className="align-items-center row">
                        <div className="col-auto">
                            <i className={`${iconType || 'far'} fa-${icon}`}></i>
                        </div>
                        <div className="col">
                            <h6 className="text-uppercase text-muted mb-2">{name}</h6>
                            <span className="h2 mb-0">{value}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
