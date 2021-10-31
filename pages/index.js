import { useState } from "react"
import { useRouter } from 'next/router'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchKeyup = (e) => {
    setSearchQuery(e.target.value.trim())
  }
  const handleSubmit = () => {
    if (searchQuery === '') return
    router.push(`/results?s=${searchQuery}`)
  }
  return (
    <>
      <div className="main-content">
        <div className="card m-5 pb-5">
          <div className="card-body p-5">
            <img className="img-fluid my-5 d-block mx-auto search-box-img" src="https://dashkit-react.vercel.app/img/illustrations/happiness.svg" alt="..." />
            <div className="col-lg-5 col-md-6 mx-auto">
              <input 
              onChange={handleSearchKeyup}
              placeholder="Search the company" 
              className="form-control-rounded form-control" />
              <button 
              onClick={handleSubmit}
              type="button" 
              className="my-3 px-5 mx-auto d-block btn btn-primary" 
              disabled={searchQuery === ''}>Search</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .search-box-img {
          max-width: 272px;
        }
      `}</style>
    </>
  )
}