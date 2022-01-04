import { useRouter } from 'next/router'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../pages/[slug]'
import TableItem from './TableItem'
export default function TopNavbar() {
    const company = useContext(Context)
    const [searchQuery, setSearchQuery] = useState('')
    const [items, setItems] = useState(null)
    
    const handleInputChange = (e) => {
        setItems(null)
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(handleSearch, 200)
        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    const search = async (query, redurect = false) => {
        setItems(null)
        try {
            const {success, results, message} = await (await fetch(`/api/businesses?s=${query}`)).json()
            if (!success)
            throw message || 'Unknown error'
            if (results && results.length == 1 && redurect) {
                router.push(`/results/${results[0].id}`)
            }
            console.log({results})
            setItems(results || [])
        } catch (error) {
            setItems([])
            console.log({searchError: error})
        }
    }
    const handleSearch = () => {
        if (searchQuery === '' || searchQuery.length < 3) return
        search(searchQuery)
    }
    return (
        <div className="top-navbar">
            <div className="container">
                <nav className="navbar navbar-expand-lg p-3 px-0">
                    <a className="navbar-brand" href="#"><img src="/img/logo.png" /></a>
                    <div className="input-group-merge input-group-flush input-group-reverse input-group position-relative">
                        <input placeholder="Search" type="search" className="form-control" onChange={handleInputChange} />
                        <span className="input-group-text"><i className="fal fa-search"></i></span>
                        { items && items.length > 0 ? (
                            <div className="search-items p-2">
                                {
                                    items.map((item, index) => (
                                        <TableItem data={item} key={index} onClick={(slug) => { location.href = `/${slug}` }} />
                                    ))
                                }
                            </div>
                        ) : '' }
                        
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-icons-right">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#"><i className="fal fa-bookmark"></i></a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link position-relative" aria-current="page" href="#">
                                <span className="notif-number">2</span>
                                <i className="fal fa-bell"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">
                                <span className="avatar-right-nav">SG</span>
                            </a>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}
