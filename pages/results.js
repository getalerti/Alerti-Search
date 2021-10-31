import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import SupabaseService from "../services/Supabase.service";

const Result = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState()
    const [items, setItems] = useState([])

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value.trim())
    }
    const handleSearch = async () => {
        if (searchQuery === '') return
        setItems(null)
        const service = new SupabaseService()
        try {
            const result = await service.search(searchQuery, 'id, name, address, telephone, website, image', 'name')
            setItems(result.data)
        } catch (error) {
            console.log({error})
        }
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
                            <th colSpan="1">Ref</th>
                            <th colSpan="1">Name</th>
                            <th colSpan="1">Adress</th>
                            <th colSpan="1">website</th>
                        </tr>
                    </thead>
                    {
                        (items === null) && (
                            <tr>
                                <td colSpan="5"> <Spinner /> </td>
                            </tr>
                        )
                    }
                    {
                        items && (
                            <tbody className="fs-base">
                                {
                                    items.map((item, index) => (
                                        <tr key={index}>
                                            <td>#{item.id}</td>
                                            <td>
                                                <div className="avatar avatar-xs me-2">
                                                    <img className="avatar-img rounded-circle"
                                                        src={item.image} alt="Launchday" />
                                                </div>
                                                {item.name}
                                            </td>
                                            <td>{item.address}</td>
                                            <td>{item.website}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export default Result;