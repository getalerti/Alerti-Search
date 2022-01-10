import React, { useEffect, useState } from 'react'

export default function Technologies() {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (window && window.innerWidth < 768) {
            setOpen(true)
        }
    }, [])
    return (
        <div className="page__section mt-5 pt-5 side-bar-4 mt-mobile-0 pt-mobile-0 mobile-card-top-space">
            <div className={`panel__title d-flex justify-content-between ${open ? 'mb-4' : ''}`}>
                <h2 className="my-0">
                    Technology
                </h2>
                <h3 className="my-0">
                    <span className="px-2" onClick={() => { setOpen(!open) }}><i className={`fas fa-chevron-${!open ? 'right' : 'down'}`}></i></span>
                </h3>
            </div>
            {
                open && <>
                <div className="small-block-img-text">
                    <img src="https://dashkit-react.vercel.app/img/avatars/teams/team-logo-5.jpg" />
                    <p>
                    <span>Viewport Meta</span>
                    Mobile
                    </p>
                </div>

                <div className="small-block-img-text">
                    <img src="https://dashkit-react.vercel.app/img/avatars/teams/team-logo-5.jpg" />
                    <p>
                    <span>Viewport Meta</span>
                    Mobile
                    </p>
                </div>

                <div className="small-block-img-text">
                    <img src="https://dashkit-react.vercel.app/img/avatars/teams/team-logo-5.jpg" />
                    <p>
                    <span>Viewport Meta</span>
                    Mobile
                    </p>
                </div>

                <div className="small-block-img-text">
                    <img src="https://dashkit-react.vercel.app/img/avatars/teams/team-logo-5.jpg" />
                    <p>
                    <span>Viewport Meta</span>
                    Mobile
                    </p>
                </div>

                <div className="small-block-img-text">
                    <img src="https://dashkit-react.vercel.app/img/avatars/teams/team-logo-5.jpg" />
                    <p>
                    <span>Viewport Meta</span>
                    Mobile
                    </p>
                </div>

                <span class="link mt-5 pt-3 d-block text-center">View all technologies</span>
                </>
            }
        </div>
    )
}
