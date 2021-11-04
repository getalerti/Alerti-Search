import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Spinner from './../../components/Spinner';
import SupabaseService from './../../services/Supabase.service';

const Result = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState()
    const [items, setItems] = useState([])

    const handleInputChange = (e) => {
        setItems(null)
        setSearchQuery(e.target.value.trim())
    }
    const search = async (query) => {
      const service = new SupabaseService()
      setItems(null)
      try {
          const result = await service.search(query, 'id, name, logo, tagLine, website', 'name, tagLine, description, specialties, type')
          setItems(result.data)
      } catch (error) {
          setItems([])
          console.log({error})
      }
    }
    const handleSearch = () => {
        if (searchQuery === '' || searchQuery.length < 3) return
        search(searchQuery)

    }
    useEffect(() => {
        setSearchQuery(router.query.s || '')
        if (router.query.s && router.query.s !== '')
          search(router.query.s)
    }, [])
    useEffect(() => {
        const delayDebounceFn = setTimeout(handleSearch, 1000)
        return () => clearTimeout(delayDebounceFn)
      }, [searchQuery])
    return (
      <>
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
                                    value={searchQuery}
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
                            <th colSpan="1">Tag line</th>
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
                                            <td className="ref-td">
                                              <Link href={`/results/${item.id}`}>
                                                <a>#{item.id}</a>
                                              </Link>
                                            </td>
                                            <td className="limited-td">
                                                <div className="avatar avatar-xs me-2">
                                                    <img className="avatar-img rounded-circle"
                                                        src={item.logo || `https://fakeimg.pl/500x500/282828/eae0d0/?retina=1&text=Default`} alt="Launchday" />
                                                </div>
                                                {item.name}
                                            </td>
                                            <td>
                                              <p className="limited-td">{item.tagLine}</p>
                                            </td>
                                            <td>
                                              <p className="limited-td">
                                                <a target="_blank" href={item.website}>{item.website}</a>
                                              </p>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
          </div>
          <style>
            {`
              .limited-td {
                max-width: 350px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .ref-td {
                text-decoration: underline;
                cursor: pointer;
              }
            `}
          </style>
        </>
    )
}

export default Result;
