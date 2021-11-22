import React from 'react'
import { useRouter } from "next/router";
export default function AdminNavbar() {
    const router = useRouter()
    return (
        <div className="header mt-md-5">
            <div className="header-body">
                <div className="align-items-center row">
                    <div className="col">
                        <h1 className="header-title">Admin area</h1>
                    </div>
                </div>
                <div className="align-items-center row">
                    <div className="col">
                        <div className="header-tabs nav-overflow nav nav-tabs">
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/companies' && 'active'}`}>Companies</a></div>
                            <div className="nav-item"><a href="/admin/diffbot" className={`nav-link ${router.pathname === '/admin/diffbot' && 'active'}`}>Diffbot</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/apify' && 'active'}`}>Apify</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/users' && 'active'}`}>Users</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/logout' && 'active'}`}>Logout</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
