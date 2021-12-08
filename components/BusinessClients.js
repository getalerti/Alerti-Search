import React from 'react'

export default function BusinessClients({ name }) {
    return (
        <div className="page__section mt-5 pt-5">
            <div className="panel__title d-flex justify-content-between">
                <h2>
                    Companies using {name}
                </h2>
            </div>
            <p>
                Make technology decisions publicly
            </p>
            
            {/* CONTACT */}
            <div className="align-items-center row py-3">
                <div className="col-auto">
                    <div className="avatar"><img className="avatar-img rounded-circle" src="https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
                            alt="..." /></div>
                </div>
                <div className="col px-0">
                    <p className="linkedin-username mb-0">
                        <b>Carolyn Kopprasch</b>
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
                        <b>Carolyn Kopprasch</b>
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
                        <b>Carolyn Kopprasch</b>
                    </p>
                </div>
            </div>
            {/* END CONTACT */}


            <span class="link mt-4 d-block text-center">+ Add your company</span>
        </div>
    )
}
