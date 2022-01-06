import React from 'react'

export default function Posts({activeNav}) {
    return (
        <>
            <div className="panel__title d-md-flex d-lg-flex d-none justify-content-between mt-0 mt-lg-4 mt-md-4 pt-0 pt-lg-4 pt-md-4" data-mobile-hide={activeNav !== 'videos'}>
                <h2>
                    posts
                </h2>
            </div>

            <div className="row mt-3 p-0 mobile-slide px-0 mx-0 list-blocs" data-mobile-hide={activeNav !== 'posts'}>
                    
                <div className="card custom-card col-md-4 col-lg-4 px-0 shadow-none border-0">
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-center row py-3">
                                    <div className="col-auto">
                                        <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                                                alt="..." /></div>
                                    </div>
                                    <div className="col">
                                        <p className="twitter-username mb-0">
                                            <b>Zain Merchant</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                                <p className="post-text">
                                Social Media Management Dashboard 
                                What's the #difference between #Hootsuite and #Bufferapp?
                                Hootsuite provides a more complete solution that allows you to schedule updates and … <span>See more</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div className="card custom-card col-md-4 col-lg-4 px-0 shadow-none border-0">
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-center row py-3">
                                    <div className="col-auto">
                                        <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                                                alt="..." /></div>
                                    </div>
                                    <div className="col">
                                        <p className="twitter-username mb-0">
                                            <b>Zain Merchant</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                                <p className="post-text">
                                Social Media Management Dashboard 
                                What's the #difference between #Hootsuite and #Bufferapp?
                                Hootsuite provides a more complete solution that allows you to schedule updates and … <span>See more</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div className="card custom-card col-md-4 col-lg-4 px-0 shadow-none border-0">
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-center row py-3">
                                    <div className="col-auto">
                                        <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                                                alt="..." /></div>
                                    </div>
                                    <div className="col">
                                        <p className="twitter-username small-text mb-0">
                                            <b>Zain Merchant</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                                <p className="post-text">
                                Social Media Management Dashboard 
                                What's the #difference between #Hootsuite and #Bufferapp?
                                Hootsuite provides a more complete solution that allows you to schedule updates and … <span>See more</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button"  data-mobile-hide={activeNav !== 'videos'} className="d-block mx-auto px-5 mt-4 lift btn btn-default">Load more posts</button>
        </>
    )
}
