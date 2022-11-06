import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import '../styles/slider.css'
export const Slider = () => {
   
    const images = [
        { url: require('../img/slider_1.webp') },
        { url: require('../img/slider_2.jpg') },
        { url: require('../img/slider_3.jpg') },
        { url: require('../img/slider_4.jpeg') }
    ];

    return (
        <div className='relative'>
             <div className='line_x items-center absolute z-20 left-20 top-1/3'>
              <p className='typing_effect pl-10 uppercase text-6xl text-white font-bold my-8'>Todo lo que buscas en un solo lugar!<span>&#160;</span></p>
            </div>
            <SimpleImageSlider
                width={1580}
                height={600}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>
    )
}
