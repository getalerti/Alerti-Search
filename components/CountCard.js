import React from 'react'

export default function CountCard({ name, value, icon = "" }) {
    console.log({icon})
    return (
        <div className="col-xl col-md-6 col-12">
            <div className="card">
                <div className="card-body">
                    <div className="align-items-center row">
                        <div className="col">
                            <h6 className="text-uppercase text-muted mb-2">{name}</h6>
                            <span className="h2 mb-0">{value}</span>
                        </div>
                        <div className="col-auto">{icon && icon()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
