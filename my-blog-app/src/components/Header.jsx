import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Accesorios } from "./Accesorios";
import { Catalogo } from "./Catalogo";
import { Hero } from "./Hero";
import { HotSale } from "./HotSale";
import { Slider } from "./Slider";
import Cookies from "universal-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../context/UserContext";
import axios from "axios";
export const Header = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { showSignIn, setShowSignIn } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  const [allPedido, setAllPedido] = useState([]);

  const [showBlog, setShowBlog] = useState(false);
  const [active, setActive] = useState(false);

  const handleChange = (e) => {
    setShowBlog(!showBlog);
  };
  const handleMain = (e) => {
    setShowBlog(false);
  };
  const checkSignIn = () => {
    //TODO: Agregar nombre de usuario
    const status = cookies.get("status_usuario");
    const nameUser = cookies.get("nombre");
    const curpUser = cookies.get("curp");
    if (status)
      return setShowSignIn({
        nameUser: nameUser,
        curp: curpUser,
        status: status,
      });

    setShowSignIn(false);
  };
  const deleteSession = () => {
    cookies.remove("id");
    cookies.remove("status_usuario");
    cookies.remove("nombre");
    cookies.remove("tipo_usuario");
    cookies.remove("curp");
    navigate("/login_user");
  };

  // Eliminar productos
  const onDeleteProduct = (product) => {
    const results = allProducts.filter(
      (item) => item.id_productp !== product.id_productp
    );

    setTotal(total - product.price_now * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };
  // limpiar Carrito
  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };
// 
  // Comprar productos
  const onPay = async () => {
    try {
      const currentDate = new Date();  
      const prueba = currentDate.toISOString().split('T');
      const fecha = prueba[0];
      const {data: pedido} = await axios.post(`http://dbtemp.devsmex.com:4000/pedido`,{
        fk_cliente: showSignIn.curp,
        fecha: fecha,
        total: total,
        cantidad: countProducts
      });
      allPedido.map((product)=> axios.post(`http://dbtemp.devsmex.com:4000/detalles`, {
        fk_pedido: pedido.id_pedido,
        fk_producto: product.id_producto
      }));

      onCleanCart();
      alert("Su compra fue exitosa")

    } catch (error) {
      alert("No se pudo realizar la compra");
    }
  };

  useEffect(() => {
    checkSignIn();
  }, []);

  return (
    <div>
      <header className="font-medium">
        <nav className="relative z-40 flex items-center justify-between p-5 text-xs shadow-md bg-neutral-50 ">
          <div className="p-0 m-0 ">
            <p className="text-3xl">Ferreteria Bello 🛠​</p>
          </div>
          <div className="flex justify-center ">
            <ul className="flex text-xs ">
              <li>
                <div
                  onClick={handleMain}
                  className="px-4 border-2 border-black border-solid rounded-full hover:border-orange-400"
                >
                  <img
                    className="w-5 icon"
                    loading="lazy"
                    src="./home.svg"
                    alt="/"
                  />
                </div>
              </li>
              {/* <li>
                <div className="px-2" onClick={handleMain}>
                  <a href="#catalogo">
                    <p>Plomería</p>
                  </a>
                </div>
              </li> */}

              {/* <li>
                <div className="px-2" onClick={handleMain}>
                  <a href="#hotSale">
                    <p>Herreria</p>
                  </a>
                </div>
              </li>
              <li>
                <div className="px-2" onClick={handleMain}>
                  <a href="#accesorios">
                    <p>Electricidad</p>
                  </a>
                </div>
              </li> */}
              <li>
                <div className="px-2" onClick={handleChange}>
                  <NavLink to={"blog"}>Albañilería</NavLink>
                </div>
              </li>
              {showSignIn.status ? (
                <div className="flex">
                <li>
                  <div className="px-2">
                    <div className="container-icon">
                      <div
                        className="container-cart-icon"
                        onClick={() => setActive(!active)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="icon-cart"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        <div className="count-products">
                          <span id="contador-productos">{countProducts}</span>
                        </div>
                      </div>

                      <div
                        className={`container-cart-products ${
                          active ? "" : "hidden-cart"
                        }`}
                      >
                        {allProducts.length ? (
                          <div>
                            <div className="row-product">
                              {allProducts.map((product, index) => (
                                <div className="cart-product" key={index}>
                                  <div className="info-cart-product">
                                    <span className="cantidad-producto-carrito">
                                      {product.quantity}
                                    </span>
                                    <p className="titulo-producto-carrito">
                                      {product.nombre_producto}
                                    </p>
                                    <span className="precio-producto-carrito">
                                      ${product.precio_descuento}
                                    </span>
                                  </div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="icon-close"
                                    onClick={() => onDeleteProduct(product)}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </div>
                              ))}
                            </div>

                            <div className="cart-total">
                              <h3>Total:</h3>
                              <span className="total-pagar">${total}</span>
                            </div>

                            <button
                              className="btn-clear-all mt-2 bg-[#ff1717]"
                              onClick={onCleanCart}
                            >
                              Vaciar Carrito
                            </button>
                            <button
                              className="btn-clear-all rounded-b-lg bg-[#23ff5e]"
                              onClick={onPay}
                            >
                              Pagar
                            </button>
                          </div>
                        ) : (
                          <p className="cart-empty">El carrito está vacío</p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="px-2" onClick={handleChange}>
                  <NavLink to={"misproductos"}>Mis pedidos</NavLink>
                </li>
                </div>
              ) : (
                <></>
              )}
              
            </ul>
          </div>
          {showSignIn.status ? (
            <div className="flex flex-col justify-center">
              <AccountCircleIcon fontSize="large" />
              <h1>{showSignIn.nameUser}</h1>
              <button onClick={deleteSession}>Cerrar sesion</button>
            </div>
          ) : (
            <div className="px-2">
              <NavLink to={"/login_user"}>Iniciar Sesion</NavLink>
            </div>
          )}
        </nav>
      </header>
      {showBlog ? (
        <div >
          <Outlet />
        </div>
      ) : (
        <div className="">
          <section className="slider">
            <div className="flex justify-center">
              <Slider />
            </div>
          </section>
          {/* CATALOGO DE PLOMERIA */}
          <section className="mt-10 catalogo" id="catalogo">
            <Catalogo
              title={"Plomeria"}
              categoric={"plomeria"}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
              allPedido={allPedido}
              setAllPedido={setAllPedido}
            />
          </section>
          <section className="hero">
            <Hero slogan={"LAS MEJORES MARCAS"} />
          </section>
          <section id="hotSale">
            <HotSale />
          </section>
          <section>
            <Hero slogan={"PRECIOS ECONOMICOS!!"} />
          </section>
          <section id="accesorios">
            <Accesorios />
          </section>
        </div>
      )}
      {/* PIEE DE PAGINA */}
      <footer className="text-white bg-slate-900">
        <nav>
          <div className="justify-between text-base border-b-2 border-white lg:flex md:text-lg sm:text-sm contenedor">
            <div className="py-2">
              <ul className="flex flex-col items-center sm:flex-row">
                <li>
                  <div className="px-2">
                    <a href="/">Inicio</a>
                  </div>
                </li>

                <li>
                  <div className="px-2" onClick={handleMain}>
                    <a href="#catalogo">Plomería</a>
                  </div>
                </li>

                <li>
                  <div className="px-2" onClick={handleMain}>
                    <a href="#hotSale">Herreria</a>
                  </div>
                </li>

                {/* <li>
                  <div className="px-2" onClick={handleMain}>
                    <a href="#accesorios">Carpintería</a>
                  </div>
                </li> */}

                <li>
                  <div className="px-2" >
                    <NavLink to={"/blog"}>Albañilería</NavLink>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-row py-3 capitalize">
              <span className="mr-5">Redes sociales</span>

              <ul className="flex items-center invert">
                <li>
                  <a href="https://facebook.com/" target="_blank">
                    <img
                      className="w-6"
                      loading="lazy"
                      src="./facebook.svg"
                      alt="facebook"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://instagram.com/" target="_blank">
                    <img
                      className="w-7"
                      loading="lazy"
                      src="./instagram.svg"
                      alt="instagram"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://youtube.com/" target="_blank">
                    <img
                      className="w-6"
                      loading="lazy"
                      src="./youtube.svg"
                      alt="youtube"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="py-6 text-sm text-center capitalize md:text-lg">
          {" "}
          © Copyright 2022 - todos los derechos reservados por Ferreteria
          Brito's{" "}
        </div>
      </footer>
    </div>
  );
};
