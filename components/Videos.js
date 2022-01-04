import React from 'react'

export default function Videos({activeNav}) {
    return (
        <>
            <div className="panel__title d-md-flex d-lg-flex d-none justify-content-between " data-mobile-hide={activeNav !== 'videos'}>
                <h2>
                    videos
                </h2>
            </div>

            <div className="row mt-3 p-0 mobile-slide list-blocs" data-mobile-hide={activeNav !== 'videos'}>
                
            <div className="card custom-card col-md-4 col-lg-4 px-0 shadow-none border-0">
                    <a href="/project-overview">
                    <img className="card-img-top card-img-top" src="https://dashkit-react.vercel.app/img/avatars/projects/project-1.jpg" alt="..." /></a>
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-start row py-3">
                                    <div className="col-auto">
                                        <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                                                alt="..." /></div>
                                    </div>
                                    <div className="col">
                                        <h5>Buffer vs Later vs HootSuite vs SocialOomph vs Sprout Social (Best Social Media Scheduling App?)</h5>
                                        <p className="twitter-username mb-0">
                                            <b>Zain Merchant</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card custom-card col-md-4 col-lg-4 px-0 shadow-none border-0">
                    <a href="/project-overview">
                    <img className="card-img-top card-img-top" src="https://dashkit-react.vercel.app/img/avatars/projects/project-1.jpg" alt="..." /></a>
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-start row py-3">
                                    <div className="col-auto">
                                        <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                                                alt="..." /></div>
                                    </div>
                                    <div className="col">
                                        <h5>Buffer vs Later vs HootSuite vs SocialOomph vs Sprout Social (Best Social Media Scheduling App?)</h5>
                                        <p className="twitter-username mb-0">
                                            <b>Zain Merchant</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card custom-card col-md-4 col-lg-4 px-0 shadow-none border-0">
                    <a href="/project-overview">
                    <img className="card-img-top card-img-top" src="https://dashkit-react.vercel.app/img/avatars/projects/project-1.jpg" alt="..." /></a>
                    <div className="card-body my-0 py-0 px-0 mx-0">
                        <div className="align-items-center row">
                            <div className="col">
                                <div className="align-items-start row py-3">
                                    <div className="col-auto">
                                        <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                                                alt="..." /></div>
                                    </div>
                                    <div className="col">
                                        <h5>Buffer vs Later vs HootSuite vs SocialOomph vs Sprout Social (Best Social Media Scheduling App?)</h5>
                                        <p className="twitter-username mb-0">
                                            <b>Zain Merchant</b> <br />
                                            November 25, 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button"  data-mobile-hide={activeNav !== 'videos'} className="d-block mx-auto px-5 mt-4 lift btn btn-default">Load more videos</button>
        </>
    )
}
