import React from 'react'

export default function AlertiButtons({className}) {
    return (
        <div className={className}>
            <button type="button" className="w-100 lift btn btn-primary">
                <i className="fad fa-bell-plus"></i> Setup an alert
            </button>
            <button type="button" className="w-100 mt-3 lift btn btn-default">
                <i className="fal fa-bookmark"></i> Add to list
            </button>
        </div>
    )
}
