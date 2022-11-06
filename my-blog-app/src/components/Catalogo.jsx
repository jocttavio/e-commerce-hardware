import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../styles/catalogo.css"
import { Cards } from './Cards'
export const Catalogo = () => {
    
    const [product,setProduct] = useState([])
    //Peticion al servidor
    const loadProduct = async () => {
        const response = await fetch('http://localhost:4000/plomeria');
        const data = await response.json();
        setProduct(data)

    }
useEffect(()=>{
    loadProduct()
},[])

    return (
        <div>
            <div className="w-full">
                <header className='header-catalogo'>
                    <div className='font-bold text-6xl'>
                        <h1>
                            Plomeria
                        </h1>
                    </div>
                </header>
                <div className="container-catalogo">
                    {product.map((singleProduct,index) => (
                        <div key={index}>
                           <Cards title={singleProduct.nombre_product}
                           price={`Antes: $${singleProduct.price_old}`} priceNow={`Ahora: $${singleProduct.price_now}`} description={`Descripción: ${singleProduct.description}`} stars={singleProduct.stars} image={singleProduct.image_name}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
