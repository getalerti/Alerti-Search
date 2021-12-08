import React, { useContext, useEffect, useMemo, useState } from 'react'
import { diffDaysTimestamps } from '../helpers/functions'
import { Context } from '../pages/[slug]'
import Spinner from './Spinner'

export default function News() {
    const company = useContext(Context)
    const [showCount, setShowCount] = useState(3)
    const [newsFeed, setNewsFeed] = useState(null)
    const [authors, setAuthors] = useState([])

    const getNews = async (id, _articles, articlesUpdatedAt, query) => {
        try {
          if (_articles && articlesUpdatedAt && diffDaysTimestamps(Date.now(), articlesUpdatedAt) <= 1) {
            setNewsFeed(_articles)
            return;
          }
          const {success, articles, message} = await (await fetch(`/api/backlinks?s=${query}&id=${id}`)).json()
          if (!success) 
                throw message || 'Unknown error'
                setNewsFeed(articles)
          await (await fetch(`/api/backlinks?only=sentiment&id=${id}`)).json()
        } catch (error) {
            console.log({getNewsError: error})
        }
      }
    useEffect(() => {
        if (newsFeed) {
            // TODO: get authors
        }
    }, [newsFeed])
    useEffect(() => {
        console.log(company)
        if (company && company.website) { 
            getNews(company.id, company.articles, company.articlesUpdatedAt, company.website)
        }
    }, [company])

    return (
        <>
            <div className="panel__title d-flex justify-content-between">
                <h2>
                39 482 people talk about {company.name}
                </h2>
                <h3>
                    Last update : {new Date(Date(company.articlesUpdatedAt)).toLocaleString()}
                    <span className="px-2"><i className="fas fa-sync-alt"></i> Refresh</span>
                </h3>
            </div>
            { authors.length > 0 && <div className="avatars-group slide pt-3">
                {
                    authors.map(({ avatar_url, name, link }, index) => 
                        <img class="avatar-img rounded-circle" src={avatar_url} alt={name} title={name} key={index} />
                    )
                }
            </div>}
            
            <div className="panel__title d-flex justify-content-between mt-5 pt-5">
                <h2>
                    News
                </h2>
            </div>
            <div className="row mt-3 p-0">
                { newsFeed === null ? <Spinner light={true} /> : newsFeed.map(({image_url, url, title, snippet, timestamp}, index) => (
                    <div className="card custom-card col-md-4 col-lg-4 px-3 shadow-none border-0" 
                            key={index}
                            style={{ display: (index > showCount - 1 ? 'none' : 'flex') }}>
                        <a href={url} target="_blank"><img className="card-img-top card-img-top" src={image_url} alt="..." /></a>
                        <div className="card-body px-0 mx-0">
                            <div className="align-items-center mb-4 row">
                                <div className="col">
                                    <h4 className="mb-2">
                                        {title}
                                    </h4>
                                    <p className="small text-muted">
                                        {timestamp} / <u>Unknown</u>
                                    </p>
                                    <p className="mb-0">
                                        {snippet}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
                
            </div>
            <button type="button" 
            className="d-block mx-auto my-3 px-5 lift btn btn-default"
            onClick={() => { setShowCount(20) }}>Load more news</button>
        </>
    )
}
