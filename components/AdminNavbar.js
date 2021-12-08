import React from 'react'
import { useRouter } from "next/router";
export default function AdminNavbar() {
    const router = useRouter()
    return (
        <div className="header mt-md-5">
            <div className="header-body">
                <div className="align-items-center row">
                    <div className="col">
                        <h1 className="header-title">Companies</h1>
                    </div>
                </div>
                <div className="align-items-center row">
                    <div className="col">
                        <div className="header-tabs nav-overflow nav nav-tabs">
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/companies' && 'active'}`}>Search</a></div>
                            <div className="nav-item"><a href="/admin/diffbot" className={`nav-link ${router.pathname === '/admin/diffbot' && 'active'}`}>Diffbot</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/linkedin' && 'active'}`}>Linkedin</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/crunchbase' && 'active'}`}>Crunchbase</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/website' && 'active'}`}>Websites</a></div>
                            <div className="nav-item"><a href="/admin/users" className={`nav-link ${router.pathname === '/admin/users' && 'active'}`}>Users</a></div>
                            <div className="nav-item"><a href="/admin/meilisearch" className={`nav-link ${router.pathname === '/admin/meilisearch' && 'active'}`}>Meilisearch</a></div>
                            <div className="nav-item"><a href="/admin/spreadsheet" className={`nav-link ${router.pathname === '/admin/spreadsheet' && 'active'}`}>Spreadsheet</a></div>
                            <div className="nav-item"><a href="/admin/companies" className={`nav-link ${router.pathname === '/admin/logout' && 'active'}`}>Logout</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
