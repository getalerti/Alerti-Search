import React from 'react'

export default function ReputationScore() {
    const viewAll = () => {}
    return (
        <div className="page__section pt-md-5 pt-lg-5 side-bar-1">
            <div className="panel__title d-flex justify-content-between">
                <h2>
                Reputation score <i className="px-2 far fa-question-circle"></i>
                </h2>
            </div>
            <div className="score mt-2">
                <div className="score__result pr-2">
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
                <span class="link mt-4 d-block text-center hide-desktop" onClick={viewAll}>See metrics</span>
            </div>
            <span class="link mt-4 d-block text-center hide-mobile" onClick={viewAll}>See metrics</span>
        </div>
    )
}
