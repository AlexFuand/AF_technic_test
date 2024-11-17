import React from 'react'
import './banner.scss'

interface BannerProp {
    text?:string
}

const Banner: React.FC<BannerProp> = ({text}) => {
    return (
        <>
            <div className="banner">
                {text}
            </div>
            <div className='banner_line'></div>
        </>
    )
}

export default Banner;