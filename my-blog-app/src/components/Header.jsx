import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Accesorios } from './Accesorios'
import { Catalogo } from './Catalogo'
import { Hero } from './Hero'
import { HotSale } from './HotSale'
import { Slider } from './Slider'

export const Header = () => {
    const [showBlog, setShowBlog] = useState(false);

    const handleChange = e => {
        setShowBlog(!showBlog)
    }
    const handleMain = e => {
        setShowBlog(false);
    }
    return (    
        <div>

            <header className='font-medium'>
                <nav className='text-xs shadow-md pb-3 bg-neutral-50 relative z-40 '>
                        <div className='p-0 m-0 '>
                            <p className='text-3xl'>Ferreteria Brito's 🛠​</p>
                        </div>
                    <div className=" flex justify-center">
                        <ul className="flex text-xs ">
                            <li>
                                <div onClick={handleMain} className="px-4 border-solid border-2 border-black hover:border-orange-400 rounded-full">
                                    <img className="icon w-5" loading="lazy" src="./home.svg" alt="/" />
                                </div>
                            </li>
                            <li>
                                <div className="px-2" onClick={handleMain}>
                                    <a href="#catalogo">
                                        <p>Plomería</p>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div className="px-2" onClick={handleMain}>
                                    <a href='#hotSale'>
                                        <p>
                                            Herreria
                                        </p>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="px-2" onClick={handleMain}>
                                    <a href='#accesorios'>
                                        <p>
                                            Electricidad
                                        </p>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="px-2" onClick={handleChange}>
                                    <NavLink to={"/blog"}>
                                        Albañilería
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            {showBlog ? <div>
                <Outlet />
            </div> : <div>
                <section className="slider">
                    <div className='flex justify-center'>
                        <Slider />
                    </div>
                </section>
                <section className="catalogo mt-10" id='catalogo'>
                    <Catalogo />
                </section>
                <section className="hero">
                    <Hero slogan={'LAS MEJORES MARCAS'}/>
                </section>
                <section id='hotSale'>
                    <HotSale />
                </section>
                <section>
                    <Hero slogan={'PRECIOS ECONOMICOS!!'} />
                </section>
                <section id='accesorios'>
                    <Accesorios />
                </section>
            </div>}
            <footer className="bg-slate-900 text-white">
                <nav>
                    <div className="lg:flex md:text-lg sm:text-sm text-base contenedor justify-between border-b-2 border-white">
                        <div className="py-2">
                            <ul className="flex items-center sm:flex-row flex-col">
                                <li>
                                    <div className="px-2">
                                        <a href="/">Inicio</a>
                                    </div>
                                </li>

                                <li>
                                    <div className="px-2" onClick={handleMain}>
                                        <a href='#catalogo'>Plomería</a>
                                    </div>
                                </li>

                                <li>
                                    <div className="px-2" onClick={handleMain}>
                                        <a href="#hotSale">Herreria</a>
                                    </div>
                                </li>

                                <li>
                                    <div className="px-2" onClick={handleMain}>
                                        <a href="#accesorios">Carpintería</a>
                                    </div>
                                </li>

                                <li>
                                    <div className="px-2"  onClick={handleChange}>
                                    <NavLink to={"/blog"}>
                                        Albañilería
                                    </NavLink>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="flex flex-row py-3 capitalize">
                            <span className="mr-5">Redes sociales</span>

                            <ul className="flex items-center  invert">
                                <li>
                                    <a href='https://facebook.com/' target="_blank">
                                        <img className="w-6" loading="lazy" src="./facebook.svg" alt="facebook" />
                                    </a>
                                </li>

                                <li>
                                    <a href='https://instagram.com/' target="_blank">
                                        <img className="w-7" loading="lazy" src="./instagram.svg" alt="instagram" />
                                    </a>
                                </li>

                                <li>
                                    <a href='https://youtube.com/' target="_blank">
                                        <img className="w-6" loading="lazy" src="./youtube.svg" alt="youtube" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="text-center md:text-lg text-sm py-6 capitalize"> © Copyright 2022  - todos los derechos reservados por Ferreteria Brito's </div>
            </footer>
        </div>
    )
}
