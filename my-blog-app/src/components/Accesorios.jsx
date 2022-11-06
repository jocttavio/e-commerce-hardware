import React from 'react'
import { Cards } from './Cards'
import '../styles/accesorios.css'
import { useEffect } from 'react'
import { useState } from 'react'
export const Accesorios = () => {
  const [product, setProduct] = useState([])
  const img = ['accesorios/1.png','accesorios/2.png','accesorios/3.png','accesorios/4.png','accesorios/5.png','accesorios/6.png']
  //Peticion al servidor
  const loadProduct = async () => {
      const response = await fetch('http://localhost:4000/electricidad');
      const data = await response.json();
      setProduct(data)
     

  }
  useEffect(() => {
      loadProduct();
  }, []);
  return (
    <div className='container-acce'>
        <header className='title-acce'>
                <h1>Electricidad​</h1>
            </header>
            <div className='items-acce'>
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
