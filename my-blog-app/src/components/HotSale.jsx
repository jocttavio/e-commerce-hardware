import React from 'react'
import '../styles/hotsale.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { Cards } from './Cards'
export const HotSale = () => {
    const img = ['hotsale/7.png','hotsale/8.png','hotsale/9.png','hotsale/10.png','hotsale/11.png','hotsale/12.png']
    const [product, setProduct] = useState([])
    //Peticion al servidor
    const loadProduct = async () => {
        const response = await fetch('http://localhost:4000/herreria');
        const data = await response.json();
        setProduct(data)

    }
    useEffect(() => {
        loadProduct();
    }, []);
    return (
        <div className='container-hot'>
            <header className='title-hot'>
                <h1>Herreria </h1>
                {/*<img src={require('../img/slider_4.jpeg')} alt="" width={200} />*/}
            </header>
            <div className='items-hot'>
            {product.map((singleProduct,index) => (
                        <div key={index}>
                              <Cards title={singleProduct.nombre_product}
                           price={`Antes: $${singleProduct.price_old}`} priceNow={`Ahora: $${singleProduct.price_now}`} description={`Descripción: ${singleProduct.description}`} stars={singleProduct.stars} image={singleProduct.image_name}/>
                        </div>
                    ))}
            </div>
        </div>
    )
}
