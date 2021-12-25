import React from 'react'

export default function ReputationScore() {
    return (
        <div className=" page__section  mt-md-5 pt-md-5 mt-lg-5 pt-lg-5">
            <div className="panel__title d-flex justify-content-between">
                <h2>
                Reputation score <i className="px-2 far fa-question-circle"></i>
                </h2>
            </div>
            <div className="score mt-4">
                <div className="score__result">
                    <h4>86<span>/100</span></h4>
                    <div className="score__result__stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                </div>
                <div className="score__arrow px-4">
                    <i class="fas fa-level-up-alt"></i>
                </div>
            </div>
            <span class="link mt-4 d-block text-center">See metrics</span>
        </div>
    )
}
