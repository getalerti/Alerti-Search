import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import MeiliSearchService from './../../services/MeiliSearch.service';
import TableItem from '../../components/TableItem';
import { getUrlSearchQuery } from './../../helpers/functions'

const Result = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState()
    const [items, setItems] = useState([])

    const handleInputChange = (e) => {
        setItems(null)
        setSearchQuery(e.target.value)
    }
    const search = async (query, redurect = false) => {
      const service = new MeiliSearchService()
      setItems(null)
      try {
          const result = await service.search(query)
          if (result.hits && result.hits.length == 1 && redurect) {
              router.push(`/results/${result.hits[0].id}`)
          }
          setItems(result.hits || [])
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
        setSearchQuery(getUrlSearchQuery())
        if (getUrlSearchQuery())
          search(getUrlSearchQuery(), true)
    }, [])
    useEffect(() => {
        const delayDebounceFn = setTimeout(handleSearch, 200)
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
            {
                items && (
                    <>
                        {
                            items.map((item, index) => (
                                <TableItem data={item} key={index} onClick={(id) => { router.push(`/results/${id}`) }} />
                            ))
                        }
                    </>
                )
            }
          </div>
        </>
    )
}

export default Result;
