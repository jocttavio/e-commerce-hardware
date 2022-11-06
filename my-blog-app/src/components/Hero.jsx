import React from 'react'
import '../styles/hero.css';

export const Hero = ({slogan}) => {
    return (
        <div className={`image_hero big_image text-center bg-fixed mt-10 text-shadow border`}>
            <div className='w-4/5'>
                <h4 className="text-center xl:text-8xl text-4xl text-white font-bold my-8">{slogan}</h4>
            </div>
            <div className='mr-20'>
                <img src={require('../img/tools.png')} alt="tools" width={250} />
            </div>
        </div>
    )
}
