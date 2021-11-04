import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs';

export default function TableItem({ data, onClick }) {
    const { id, logo, name, tagLine, industry, followerCount } = data
    return (
        <div className="table-item mb-5 p-4" onClick={() => { onClick(id) }}>
            <img src={logo} alt={name} />
            <div className="table-item__group">
                <h3>{name}</h3>
                <p>{tagLine}</p>
                <span>{industry}</span>
            </div>
            <div className="table-item__counts">
                {followerCount} <BsFillPeopleFill />
            </div>
        </div>
    )
}
