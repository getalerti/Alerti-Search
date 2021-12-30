import { createContext, useEffect, useState } from 'react'
import BusinessClients from '../components/BusinessClients'
import Financials from '../components/Financials'
import FindContacts from '../components/FindContacts'
import News from '../components/News'
import PageHeader from '../components/PageHeader'
import RelatedSearches from '../components/RelatedSearches'
import ReputationScore from '../components/ReputationScore'
import Technologies from '../components/Technologies'
import TopNavbar from '../components/TopNavbar'
import Footer from '../components/Footer'
import Tweets from '../components/Tweets'
import Videos from '../components/Videos'
import { diffDaysTimestamps, getRouteParam } from './../helpers/functions'
import { useRouter } from 'next/router'
import Company from '../models/Company'

export const Context = createContext({...Company});

export default () => {
  const [ready, isReady] = useState(false)
  const [activeNav, setActiveNav] = useState('news')
  const [item, setItem] = useState({...Company})
  const router = useRouter()

  useEffect(() => {
    const id = getRouteParam('/')
    if (id && id !== '') {
      getItem(id)
    } else {
      router.push("/")
    }
  }, [])
  useEffect(() => {
    isReady(item !== null)
    if (item) {
      if (item.socials) {
        setSocialNetworks(item.socials)
      } else {
        //getSocials(item.id, item.website)
      }
    }
  }, [item])
  const sanitizeItem = (_item) => {
    const newItem = {..._item}
    try {
      if (!JSON.parse(newItem.industries) && newItem.industries) {
        newItem.industries = [newItem.industries]
      } else {
        newItem.industries = JSON.parse(_item.industries)
      }
    } catch (error) {
      newItem.industries = newItem.industries ? [newItem.industries] : []
    }
    setItem(newItem)
  }
  const getItem = async (id) => {
    try {
      const {success, results, message} = await (await fetch(`/api/businesses?document=${id}`)).json()
      if (!success)
            throw message || 'Unknown error'
      if(!results || results.length === 0)
        router.push("/404")
      sanitizeItem(results)
    } catch (error) {
        console.log({getItemError: error})
    }
  }
  
  return (
    <Context.Provider value={item}>
      <div className="fluid-container company-page px-0 mx-0 pb-5">
        <TopNavbar name="Buffer" />
        <div className="container">
          <PageHeader  />
        </div>
        <div className="container pb-5 mb-5">
          <div className="row flex-row-reverse">
            <div className="col-md-3 col-lg-3">
              <ReputationScore />
            </div>
            <div className="col-md-9 col-lg-9">
              <div className="page__section mt-md-5 pt-md-5 mt-lg-5 pt-lg-5">
                <News setActiveNav={setActiveNav} activeNav={activeNav} />
              </div>
            </div>

          </div>
          <div className="row">

            <div className="col-md-9 col-lg-9">
              <div className="page__section mt-md-5 pt-md-5 mt-lg-5 pt-lg-5">
                <Tweets activeNav={activeNav} />
                <Videos  activeNav={activeNav} />
              </div>
            </div>

            <div className="col-md-3 col-lg-3">
              <FindContacts />
              <BusinessClients name="buffer" />
              <Financials />
              <Technologies />
            </div>

          </div>
          <RelatedSearches />
        </div>
        {/* <Footer /> */}
      </div>
    </Context.Provider>
   
  )
}
