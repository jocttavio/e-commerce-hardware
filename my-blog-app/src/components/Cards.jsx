import React from 'react';
import estrella from '../img/estrella.svg'
import '../styles/cards.css';

export const Cards = ({ title, price, priceNow, description,  stars, image}) => {
    //Producir estrellas
    var star = [...Array(stars)].map(x => 0);
    return (
        <div>
            <div className="cards hover:cursor-pointer hover:scale-100 hover:-translate-y-4 delay-75 duration-200">
                <div className="cards_item">
                    <div className="card">
                        <div className="card_image">
                            <img src={require(`../img/${image}`)} alt='Imagen' />
                        </div>
                        <div className="card_content">
                            <h2 className="card_title">{title}</h2>
                            <div className="estrellas flex justify-center">
                                {star.map((num, index) => {
                                    return <div key={index}>   <img className="icon" width={40} src={estrella} alt="estrella" /></div>
                                })}
                            </div>
                            <ul className="card_text">
                            <li>
                                    {price}
                                </li>
                                <li className='text-green-400 font-bold text-2xl'>
                                    {priceNow}
                                </li>
                                <li>
                                    {description}
                                </li>
                            </ul>
                            <button className="btn card_btn">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
