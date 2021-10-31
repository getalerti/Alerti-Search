import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Result = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState()
    const [items, setItems] = useState([])

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value.trim())
    }
    const handleSearch = () => {
        if (searchQuery === '') return
        setItems(null)
        setTimeout(() => {setItems([])}, 3000)
    }
    useEffect(() => {
        setSearchQuery(router.query.s || '')
    }, [])
    return (
        <div className="col-lg-10 mx-auto p-5">
            <div className="header">
                <div className="header-body">
                    <div className="align-items-center row">
                        <div className="col">
                            <h6 className="header-pretitle">Searching for</h6>
                            <h1 className="header-title text-truncate">{searchQuery || '-'}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <div className="align-items-center row">
                        <div className="col">
                            <div className="input-group-merge input-group-flush input-group">
                                <span className="input-group-text">
                                        <FiSearch />
                                    </span>
                                <input
                                    onChange={handleInputChange}
                                    placeholder="Search" 
                                    type="search" 
                                    className="form-control" />
                                <button 
                                    onClick={handleSearch}
                                    type="button" 
                                    disabled={items === null}
                                    className="btn btn-primary btn-sm rounded">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="card-table table-nowrap table table-sm table-hover">
                    <thead>
                        <tr>
                            <th colSpan="1">Name</th>
                            <th colSpan="1">Industry</th>
                            <th colSpan="1">Location</th>
                            <th colSpan="1">Owner</th>
                            <th colSpan="1">Crated at</th>
                        </tr>
                    </thead>
                    {
                        (items === null) && (
                            <tr>
                                <td colSpan="5"> <Spinner /> </td>
                            </tr>
                        )
                    }
                    {/*
                    <tbody className="fs-base">
                        <tr>
                            <td>
                                <div className="avatar avatar-xs me-2">
                                    <img className="avatar-img rounded-circle"
                                        src="https://dashkit-react.vercel.app/img/avatars/teams/team-logo-1.jpg" alt="Launchday" />
                                </div>
                                <a className="text-reset" href="/team-overview">Launchday</a>
                            </td>
                            <td>Web design</td>
                            <td>Los Angeles, CA</td>
                            <td>
                                <a className="text-reset" href="/profile-posts">Dianna Smiley</a>
                            </td>
                            <td>
                                <time dateTime="2020-01-14">Jan 14, 2020</time>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                    */}
                </table>
            </div>
        </div>
    )
}

export default Result;