import React, { useContext, useEffect, useState } from 'react'
import { diffDaysTimestamps, sanitizeUrl } from '../helpers/functions'
import { Context } from '../pages/[slug]'
import Spinner from './Spinner'

export default function Tweets({activeNav}) {
    const company = useContext(Context)
    const [showCount, setShowCount] = useState(3)
    const [tweetsFeed, setTweetsFeed] = useState(null)

    const getTweets = async (id, _tweets, tweetsUpdatedAt, query) => {
        try {
          if (_tweets && tweetsUpdatedAt && diffDaysTimestamps(Date.now(), tweetsUpdatedAt) <= 1) {
            // setTweetsFeed(_tweets)

          console.log({_tweets})
            // return;
          }
          // const tweets = await (await fetch(`/api/tweets?s=${query}&id=${id}`)).json()
          console.log({tweets})
          if (tweets.error) 
                throw message || 'Unknown error'
            // setTweetsFeed(tweets)
          // await (await fetch(`/api/backlinks?only=sentiment&id=${id}`)).json()
        } catch (error) {
            console.log({getTweetsError: error})
        }
      }
    useEffect(() => {
        if (company && company.website && company.socials && company.socials.twitterUri) { 
            getTweets(company.id, company.tweets, company.tweetsUpdatedAt, sanitizeUrl(company.socials.twitterUri))
        }
    }, [company])
    return (
        <>
            <div className="panel__title d-md-flex d-lg-flex d-none justify-content-between" data-mobile-hide={activeNav !== 'tweets'}>
                <h2>
                    twitter
                </h2>
            </div>

            <div className="row mt-3  mobile-slide p-0" data-mobile-hide={activeNav !== 'tweets'}>
            {/* tweetsFeed === null ? <Spinner light={true} /> : tweetsFeed.map(({ url, user, full_text, created_at}, index) => (
                
            )
            ) */}
            <div className="card custom-card col-md-4 col-lg-4 px-3 shadow-none border-0">
                    <a href={'#'} target="_blank">
                    <img className="card-img-top card-img-top" src={"https://dashkit-react.vercel.app/img/avatars/projects/project-1.jpg"} alt="..." /></a>
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-center row py-3">
                                    <div className="col-auto">
                                        <div className="avatar">
                                            <img className="avatar-img rounded-circle" src={"https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"}
                                                alt="..." />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="twitter-username mb-0">
                                            <b>@youssame</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                                <p className="mb-0">
                                    This week's #StartPageChallenge: use Start Page to link to all the aspects of your business. You could link to your Amazon shop, your latest album release, or your virtual tip jar. The possibilities are endless! 🌈
                                </p>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="card custom-card col-md-4 col-lg-4 px-3 shadow-none border-0">
                    <a href={'#'} target="_blank">
                    <img className="card-img-top card-img-top" src={"https://dashkit-react.vercel.app/img/avatars/projects/project-1.jpg"} alt="..." /></a>
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-center row py-3">
                                    <div className="col-auto">
                                        <div className="avatar">
                                            <img className="avatar-img rounded-circle" src={"https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"}
                                                alt="..." />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="twitter-username mb-0">
                                            <b>@youssame</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                                <p className="mb-0">
                                    This week's #StartPageChallenge: use Start Page to link to all the aspects of your business. You could link to your Amazon shop, your latest album release, or your virtual tip jar. The possibilities are endless! 🌈
                                </p>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="card custom-card col-md-4 col-lg-4 px-3 shadow-none border-0">
                    <a href={'#'} target="_blank">
                    <img className="card-img-top card-img-top" src={"https://dashkit-react.vercel.app/img/avatars/projects/project-1.jpg"} alt="..." /></a>
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-center row py-3">
                                    <div className="col-auto">
                                        <div className="avatar">
                                            <img className="avatar-img rounded-circle" src={"https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"}
                                                alt="..." />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="twitter-username mb-0">
                                            <b>@youssame</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                                <p className="mb-0">
                                    This week's #StartPageChallenge: use Start Page to link to all the aspects of your business. You could link to your Amazon shop, your latest album release, or your virtual tip jar. The possibilities are endless! 🌈
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
                
            </div>
            <button type="button"
            onClick={() => { setShowCount(20) }}
            className="d-block mx-auto my-3 px-5 lift btn btn-default"
            data-mobile-hide={activeNav !== 'tweets'}
             className="d-block mx-auto px-5 lift btn btn-default">Load more tweets</button>
        </>
    )
}
