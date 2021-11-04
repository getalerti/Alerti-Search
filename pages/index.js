import { useState } from "react"
import { useRouter } from 'next/router'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchKeyup = (e) => {
    setSearchQuery(e.target.value.trim())
    if (e.key === 'Enter') {
      // handleSubmit()
    }
  }
  const handleSubmit = (e = null) => {
    if (e) e.preventDefault();
    if (searchQuery === '') return
    router.push(`/results?s=${searchQuery}`)
  }
  return (
    <>
      <div className="main-content">
        <div className="card search-area">
          <div className="card-body">
            <div className="col-lg-5 col-md-6 mx-auto w-100">
              <form onSubmit={handleSubmit} className="mx-auto search-form">
                <input 
                value={searchQuery}
                onChange={handleSearchKeyup}
                placeholder="Organization, business, place..." 
                className="search-input form-control" />
                <button 
                onClick={handleSubmit}
                type="button" 
                className="my-3 px-5 search-btn mx-auto d-block btn" 
                disabled={searchQuery === ''}>GO</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}