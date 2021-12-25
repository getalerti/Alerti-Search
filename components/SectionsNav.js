import React from 'react'

export default function SectionsNav({activeNav, setActiveNav}) {
    return (
        <ul className="section-navigation d-flex justify-content-between d-md-none d-lg-none my-5">
            <li className={activeNav == 'news' ? 'active' : ''} onClick={() => { setActiveNav('news') }}>NEWS</li>
            <li className={activeNav == 'tweets' ? 'active' : ''} onClick={() => { setActiveNav('tweets') }}>TWITTER</li>
            <li className={activeNav == 'videos' ? 'active' : ''} onClick={() => { setActiveNav('videos') }}>VIDEOS</li>
            <li className={activeNav == 'posts' ? 'active' : ''} onClick={() => { setActiveNav('posts') }}>POSTS</li>
        </ul>
    )
}
