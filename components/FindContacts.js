import React from 'react'

export default function FindContacts() {
    return (
        <div className="page__section mt-5 pt-5 side-bar-2 side-small-bloc mt-mobile-0 pt-mobile-0 mobile-card-top-space">
            <div className="panel__title d-flex justify-content-between">
                <h2>
                    find contacts
                </h2>
            </div>
            <p>
                View contacts for Buffer to access new leads and connect with decision-makers
            </p>
            
            {/* CONTACT */}
            <div className="align-items-center row py-3">
                <div className="col-auto">
                    <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                            alt="..." /></div>
                </div>
                <div className="col px-0">
                    <p className="linkedin-username mb-0">
                        <b>Carolyn Kopprasch <i className="fab fa-linkedin"></i></b> <br />
                        Founder
                    </p>
                </div>
            </div>
            {/* END CONTACT */}
            {/* CONTACT */}
            <div className="align-items-center row py-3">
                <div className="col-auto">
                    <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                            alt="..." /></div>
                </div>
                <div className="col px-0">
                    <p className="linkedin-username mb-0">
                        <b>Carolyn Kopprasch <i className="fab fa-linkedin"></i></b> <br />
                        Founder
                    </p>
                </div>
            </div>
            {/* END CONTACT */}
            {/* CONTACT */}
            <div className="align-items-center row py-3">
                <div className="col-auto">
                    <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                            alt="..." /></div>
                </div>
                <div className="col px-0">
                    <p className="linkedin-username mb-0">
                        <b>Carolyn Kopprasch <i className="fab fa-linkedin"></i></b> <br />
                        Founder
                    </p>
                </div>
            </div>
            {/* END CONTACT */}


            <span class="link mt-4 d-block text-center">View all contacts</span>
        </div>
    )
}
