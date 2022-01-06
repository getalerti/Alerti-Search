import React, { useState } from 'react'

export default function Financials() {
    const [open, setOpen] = useState(false)
    return (
        <div className="page__section mt-5 pt-5 side-bar-4">
            <div className={`panel__title d-flex justify-content-between ${open ? 'mb-4' : ''}`}>
                <h2 className="my-0">
                    Financials
                </h2>
                <h3 className="my-0">
                    <span className="px-2" onClick={() => { setOpen(!open) }}><i className={`fas fa-chevron-${!open ? 'right' : 'down'}`}></i></span>
                </h3>
            </div>
            {
                open && <>
                    <p className="small-block-text">
                        <span>Founded date :</span> 2010
                    </p>
                    <p className="small-block-text">
                        <span>Funding rounds : </span> 3
                    </p>
                    <p className="small-block-text">
                        <span>Total Fund Raised : </span> 21,5M
                    </p>
                    <p className="small-block-text">
                        <span>Investors :</span> 29
                    </p>
                </>
            }
        </div>
    )
}
