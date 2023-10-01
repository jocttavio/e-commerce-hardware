import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import '../styles/slider.css'
export const Slider = () => {
   
    const images = [
        { url: require('../img/slider_4.jpeg') },
        { url: require('../img/slider_1.webp') },
        { url: require('../img/slider_2.jpg') },
        { url: require('../img/slider_3.jpg') },
    ];

    return (
        <div className='relative'>
             <div className='absolute z-20 items-center line_x left-20 top-1/3'>
              <p className='pl-10 my-8 text-6xl font-bold text-white uppercase typing_effect'>Todo lo que buscas en un solo lugar!<span>&#160;</span></p>
            </div>
            <div className='w-[1515px]'>
            <SimpleImageSlider
                width={'100%'}
                height={600}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                // loop={true}
// Tiempo de duracion del slider
                autoPlayDelay={3}
            />
            </div>
        </div>
    )
}
