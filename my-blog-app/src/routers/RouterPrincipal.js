import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; //IMPORTAMOS LAS
import PrivateRouter from "../helpers/PrivateRouter";
// import PrivateRouterClient from "../helpers/PrivateRouterClient";
import { Blog } from "../components/Blog";
import { Header } from "../components/Header";
import Login from "../pages/Login";
import LoginUser from "../pages/LoginUser";
import PaginaAdmin from "../pages/admin/PaginaAdmin";

import Error from "../components/Error";
import { MyProducts } from "../pages/MyProducts";
import { Users } from "../pages/admin/users";
import { InsertUser } from "../pages/admin/users/insertUser";
import {Shopping} from "../pages/admin/shopping";
import {Providers} from "../pages/admin/providers";
import {Products} from "../pages/admin/products";
import {Orders} from "../pages/admin/orders";
import { InsertAccount } from "../pages/admin/users/insertAccount";
import { InfoUser} from "../pages/admin/users/infoUser";
import { InsertProduct } from "../pages/admin/products/insertProduct";
import { InfoProduct } from "../pages/admin/products/infoProduct";
export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login_user" element={<LoginUser />} />
        <Route path="/*" element={<Header />}>
          <Route path="blog" element={<Blog />} />
          <Route path="misproductos" element={<MyProducts />} />
        </Route>

        <Route element={<PrivateRouter />}>
          <Route path="/Pagina_Admin" element={<PaginaAdmin />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/insert_producto" element={<InsertProduct/>} />
          <Route path="/editar_producto/:id_producto" element={<InsertProduct/>} />
          <Route path="/info_products/:id_producto" element={<InfoProduct/>} />
          <Route path="/proveedores" element={<Providers />} />
          <Route path="/compras" element={<Shopping />} />
          <Route path="/insert_usuarios" element={<InsertUser />} />
          <Route path="/insert_cuenta/:curp_user" element={<InsertAccount />} />
          <Route path="/editar_usuario/:curp_user,:correo,:password" element={<InsertUser />} />
          <Route path="/info_user/:id_usuario" element={<InfoUser />} />

        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
