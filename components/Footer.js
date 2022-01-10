import React from 'react'
export default function Footer() {
    return (
        <div className="footer hide-mobile">
            <h2 className="mx-4">
                Get the latest news about what people said about Buffer
            </h2>
            <form className="mx-4">
                <input type="text" placeholder="Your email" className="border-0" />
                <button className="border-0" >Subscribe</button>
            </form>
        </div>
    )
}
