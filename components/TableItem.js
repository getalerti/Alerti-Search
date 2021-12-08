import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs';
import Company from '../models/Company';

export default function TableItem({ data, onClick }) {
    const { logo, name, slug, moto, summary, linkedin_follower_count } = data
    return (
        <div className="table-item mb-1 px-4" onClick={() => { onClick(slug) }}>
            <img src={logo} alt={name}
            onError={(e)=>{e.target.onerror = null; e.target.classList.add("unfound-logo") }} />
            <div className="table-item__group">
                <h3>{name}</h3>
            </div>
            <div className="table-item__counts">
                {linkedin_follower_count} <BsFillPeopleFill />
            </div>
        </div>
    )
}
