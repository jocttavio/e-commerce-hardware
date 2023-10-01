import React from "react";
import { Cards } from "./Cards";
import { useEffect } from "react";
import { useState } from "react";

export const Blog = () => {
  const [product, setProduct] = useState([]);
  //Peticion al servidor
  const loadProduct = async () => {
    const response = await fetch("http://localhost:4000/alba");
    const data = await response.json();
    setProduct(data);
  };
  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <main>
      {/*SECCION "HISTORIA DELL"*/}
      <section className="pb-20 mt-16 contenedor">
        <div className="grid grid-cols-1 gap-12 mx-10 lg:grid-cols-2">
          {/*COLUMNA 1 (TEXTO)*/}
          <div className="flex flex-col justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold xl:text-4xl">Albañilería</h3>
            </div>

            <section className="text-justify">
              <h4 className="mt-10 text-lg font-semibold md:text-2xl">
                La albañilería se define como la especialidad de construir
                estructuras a partir de objetos individuales que se unen y pegan
                usando mortero u otros materiales capaces de endurecer.
              </h4>
              <p className="py-6 text-sm md:text-xl sm:text-base">
                El trabajo de albañilería es uno de los trabajos más importantes
                en construcción y es esencial en la vida del hombre, estando
                presente desde los tiempos más antiguos. La albañilería surgió
                como una necesidad de refugio para el ser humano. Los primeros
                trabajos de albañilería de la historia fueron hechos con ramas,
                rocas, barro y otros materiales que se encuentran en la
                naturaleza. Con el tiempo la albañilería se benefició con los
                nuevos materiales de construcción. En la actualidad, la
                albañilería sigue siendo una de las actividades humanas más
                importantes, reflejado en el crecimiento de todas las ciudades
                del mundo.
              </p>
            </section>
          </div>

          {/*COLUMNA 2 (IMAGEN)*/}
          <div className="h-full lg:mt-10">
            <div className="px-3 py-2 mx-auto border-4 rounded-md w-fit drop-shadow-xl">
              <picture>
                <img
                  className="w-full object-cover max-h-[500px] min-h-[300px] rounded-md"
                  src={require("../img/alba1.jpg")}
                  loading="lazy"
                  alt="imagen de conocenos"
                />
              </picture>
            </div>

            <footer className="mx-24 mt-6 text-sm text-center text-slate-500">
              <i className="text-xs sm:text-base">
                La albañilería construye y restaura muros, paredes, monumentos y
                partes de edificios, garages y casas.
              </i>
            </footer>
          </div>
        </div>
      </section>
      {/*Seccion*/}
      <section className="flex flex-col justify-center min-h-screen antialiased text-gray-200 bg-gray-900">
        <div className="h-full max-w-6xl p-4 mx-auto mt-20 mb-10 sm:px-6">
          <article className="grid items-center max-w-sm gap-6 mx-auto md:max-w-none md:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-16">
            <a className="relative block group" href="#0">
              <div
                className="absolute inset-0 hidden transition duration-700 ease-out transform bg-gray-800 pointer-events-none md:block md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0"
                aria-hidden="true"
              ></div>

              <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                <img
                  className="absolute inset-0 object-cover w-full h-full transition duration-700 ease-out transform hover:scale-105"
                  loading="lazy"
                  src={require("../img/alba2.png")}
                  width="540"
                  height="303"
                  alt="Blog post"
                />
              </figure>
            </a>

            <div>
              <header>
                <div className="mb-3"></div>
                <h3 className="mb-2 text-2xl font-bold leading-tight lg:text-3xl">
                  La Albañilería en la Construcción
                </h3>
              </header>
              <p className="flex-grow text-lg text-justify text-gray-300">
                Los albañiles normalmente utilizan recipientes dónde mezclan los
                elementos para formar el mortero. Además normalmente utilizan
                los ladrillos saturados de agua, una plana de madera y un juego
                de herramientas que están compuestas por maestras, lienza y
                clavos. Dentro de la albañilería podemos encontrar diversos
                tipos que están determinados por el tipo de edificación que se
                esté llevando a cabo. Los tipos de albañilería existentes son la
                albañilería simple, albañilería armada y albañilería reforzada.
                La albañilería simple es la de uso tradicional y su desarrollo
                se ha realizado a lo largo del tiempo por experimentación. En
                esta albañilería simple los únicos elementos que se utilizan son
                el ladrillo y el mortero, podríamos decir que los albañiles
                fueron los primeros constructores de la historia.
              </p>
            </div>
          </article>
          
        </div>
        <div className="mb-3"></div>
        {/* <h3 className="mb-2 text-2xl font-bold leading-tight text-center lg:text-3xl">
          Nuestros Productos
        </h3>
        <div className="mb-10 container-catalogo">
          {product.map((singleProduct, index) => (
            <div key={index}>
              <Cards
                title={singleProduct.nombre_product}
                price={`Antes: $${singleProduct.price_old}`}
                priceNow={`Ahora: $${singleProduct.price_now}`}
                description={`Descripción: ${singleProduct.description}`}
                stars={singleProduct.stars}
                image={singleProduct.image_name}
              />
            </div>
          ))}
        </div> */}
      </section>

  
    </main>
  );
};
