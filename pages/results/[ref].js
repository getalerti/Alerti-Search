import { useEffect, useState } from 'react'
import SupabaseService from './../../services/Supabase.service'
import { getRouteParam } from './../../helpers/functions'
import { useRouter } from 'next/router'
import Spinner from './../../components/Spinner';
import defaultBanner from './../../assets/images/default_banner.png'
import defaultLogo from './../../assets/images/default_logo.png'
import { BsLinkedin, BsFillPeopleFill, BsFillCalendarDateFill } from 'react-icons/bs';

export default () => {
  const [ready, isReady] = useState(false)
  const [item, setItem] = useState(null)
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
    console.log(newItem)
    setItem(newItem)
  }

  const getItem = async (id) => {
    const service = new SupabaseService()
    try {
      const result = await service.find(id)
      if (result.data && result.data.length > 0) {
        sanitizeItem(result.data[0])
      }
    } catch (error) {
        console.log({error})
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
                        <h1 className="header-title">{ !ready ? '-' : item.name || '-' }</h1>
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
        </div>
        <div className="col-xl-4 col-12">
            <div className="card">
                <div className="card-body">
                    <div className="list-group-flush my-n3 list-group">
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Size</h5>
                                </div>
                                <div className="col-auto">
                                  { ready && (item.companySize || '-') }
                                </div>
                            </div>
                        </div>
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
                                    <h5 className="mb-0">Website</h5>
                                </div>
                                <div className="col-auto">
                                  <a href={ready && (item.website || '#')} target="_blank">
                                    { ready && (item.name || '-') }
                                  </a>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Linkedin</h5>
                                </div>
                                <div className="col-auto">
                                  <a href={ready && (item.companyUrl || '#')} target="_blank">
                                    <BsLinkedin /> { ready && (item.name || '-') }
                                  </a>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Followers count</h5>
                                </div>
                                <div className="col-auto">
                                    { ready && (item.followerCount || '-') } <BsFillPeopleFill />
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
                                    <h5 className="mb-0">Employees on LinkedIn</h5>
                                </div>
                                <div className="col-auto">
                                     { ready && (item.employeesOnLinkedIn || '-') }
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
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Growth</h5>
                                </div>
                                <div className="col-auto">
                                  Last 6 months: { ready && (item.growth6Mth || '-') } <br />
                                  Last year: { ready && (item.growth1Yr || '-') } <br />
                                  Last 2 years: { ready && (item.growth2Yr || '-') }
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="align-items-center row">
                                <div className="col">
                                    <h5 className="mb-0">Average tenure</h5>
                                </div>
                                <div className="col-auto">
                                  { ready && (item.averageTenure || '-') }
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
