import { useEffect, useState } from 'react'
import { getRouteParam } from './../../helpers/functions'
import { useRouter } from 'next/router'
import Spinner from './../../components/Spinner';
import defaultBanner from './../../assets/images/default_banner.png'
import defaultLogo from './../../assets/images/default_logo.png'
import { BsLinkedin, 
  BsFillCalendarDateFill} from 'react-icons/bs';
import CountCard from '../../components/CountCard';
import NewsItem from '../../components/NewsItem';

export default () => {
  const [ready, isReady] = useState(false)
  const [item, setItem] = useState(null)
  const [news, setNews] = useState(null)
  const router = useRouter()
  
  useEffect(() => {
    const id = getRouteParam('/results/')
    if (id && id !== '') {
      getItem(id)
    } else {
      router.push("/results")
    }
  }, [])
  useEffect(() => {
    isReady(item !== null)
  }, [item])

  const sanitizeItem = (_item) => {
    const newItem = {..._item}
    newItem.banner = newItem.banner && newItem.banner != '' ? newItem.banner : defaultBanner
    newItem.logo = newItem.logo && newItem.logo != '' ? newItem.logo : default_logo
    newItem.description = newItem.description && newItem.description != '' ? newItem.description.replace('\n', '<br />') : '_'
    setItem(newItem)
    getNews(newItem.name)
  }

  const getItem = async (id) => {
    try {
      const {success, results, message} = await (await fetch(`/api/businesses?document=${id}`)).json()
      if (!success)
            throw message || 'Unknown error'
      sanitizeItem(results)
    } catch (error) {
        console.log({getItemError: error})
    }
  }
  const getNews = async (query) => {
    try {
      const {success, results, message} = await (await fetch(`/api/backlinks?s=${query}`)).json()
      if (!success)
            throw message || 'Unknown error'
      setNews(results)
    } catch (error) {
        console.log({getNewsError: error})
    }
  }
  return (
    <div className="col-lg-10 mx-auto p-5">
    {/* HEADER */}
      <div className="header">
      {
        !ready ? <Spinner /> : (
          <img className="header-img-top"
          src={item.banner}
          onError={(e)=>{e.target.onerror = null; e.target.src = `${defaultBanner}` }}
          alt="" />
        )
      }

        <div className="container-fluid">
            <div className="header-body mt-n5 mt-md-n6">
                <div className="align-items-end row">
                    <div className="col-auto">
                        <div className="avatar avatar-xxl header-avatar-top">
                        {
                          !ready ? <Spinner /> : (
                            <img className="avatar-img rounded-circle border border-4 border-body"
                                  alt="Dianna Smiley"
                                  onError={(e)=>{e.target.onerror = null; e.target.src = `${defaultLogo}` }}
                                  src={item.logo} />
                          )
                        }
                        
                        </div>
                    </div>
                    <div className="mb-3 ms-n3 ms-md-n2 col">
                        <h6 className="header-pretitle">{ !ready ? '-' : item.industry || '-' }</h6>
                        <h1 className="header-title">
                          { !ready ? '-' : item.name || '-' } 
                          <a href={ready && (item.website || '#')} target="_blank" className="btn mx-2">
                            <i className="fas fa-external-link"></i>
                          </a>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
      </div>
      {/* END HEADER */}
      { /*DETAILS*/ }
      <div className="row row">
        <div className="col-xl-8 col-12">
            <div className="card">
                <div className="card-body">
                  <div  className="mb-3" dangerouslySetInnerHTML={{ __html: !ready ? '-' : item.description || '-'}}>
                  </div>
                </div>
            </div>
            <div className="row">
                <CountCard name="Size" value={ ready && (item.companySize || '-') } icon="people-carry" />
                <CountCard name="Followers" value={ ready && (item.followerCount || '-') } icon="users" />
                <CountCard name="Employees on LinkedIn" value={ ready && (item.employeesOnLinkedIn || '-') } iconType="fab" icon="linkedin" />
                <CountCard name="Average tenure" value={ ready && (item.averageTenure || '-') } icon="sort-size-up" />
                <CountCard name="Growth last 6 months" value={ ready && (item.growth6Mth || '-') } icon="info" />
                <CountCard name="Growth last year" value={ ready && (item.growth1Yr || '-') } icon="info" />
                <CountCard name="Growth last 2 years" value={ ready && (item.growth2Yr || '-') } icon="info" />
            </div>
            <div className="card">
              <div className="card-header">
                  <h4 className="card-header-title">Latest news</h4>
              </div>
              <div className="card-body">
                  <div className="list-group-flush my-n3 list-group">
                      { news === null && <Spinner /> }
                      { news !== null && news.map(({title, snippet, url, image_url}, index) => {
                        return <NewsItem key={index} title={title} image_url={image_url} snippet={snippet} url={url} />
                      } ) }
                  </div>
              </div>
          </div>
        </div>
        <div className="col-xl-4 col-12">
            <div className="card">
                <div className="card-body">
                    <div className="list-group-flush my-n3 list-group">
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Address</h5>
                                </div>
                                <div className="col-auto">
                                  { ready && (item.companyAddress || '-') }
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Linkedin</h5>
                                </div>
                                <div className="col-auto">
                                  <a href={ready && (item.companyUrl || '#')} 
                                  className="d-flex align-items-center" 
                                  target="_blank">
                                    <BsLinkedin /> 
                                    <span className="mx-2">{ ready && (item.name || '-') }</span>
                                  </a>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Founded</h5>
                                </div>
                                <div className="col-auto">
                                     <BsFillCalendarDateFill /> { ready && (item.founded || '-') }
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Total employee count</h5>
                                </div>
                                <div className="col-auto">
                                     { ready && (item.employeesOnLinkedIn || '-') }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* END DETAILS */}
    </div>
  )
}
