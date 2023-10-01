import React, { useState } from "react";
import {
  FaHome,
  FaBars,
  FaUserAlt,
  FaInbox,
  FaCogs,
  FaShoppingBag,
  FaChild,
} from "react-icons/fa";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NavLink,useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Sidebar = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/Pagina_Admin",
      name: "Inicio",
      icon: <FaHome />,
    },
    {
      path: "/usuarios",
      name: "Usuarios",
      icon: <FaUserAlt />,
    },
    {
      path: "/pedidos",
      name: "Pedidos de los clientes",
      icon: <FaInbox />,
    },
    {
      path: "/productos",
      name: "Productos",
      icon: <FaCogs />,
    },
    // {
    //   path: "/compras",
    //   name: "Compras",
    //   icon: <FaShoppingBag />,
    // },
    {
      path: "/proveedores",
      name: "Proveedores",
      icon: <FaChild />,
    },
  ];
  const cerrarSesion = async ()=>{
    cookies.remove("status");
    cookies.remove("nombre");
    cookies.remove("id");
    cookies.remove("curp");
    cookies.remove("tipo_usuario");
    navigate("/login");
  }
  return (
    <div className="container_side">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Ferreteria <br />
            Bello
          </h1>
          <div style={{ marginLeft: isOpen ? "20px" : "0px" }} className="bars">
            {isOpen ? (
              <div onClick={toggle}>
                <ArrowBackIosIcon  fontSize="large"/>
              </div>
            ) : (
              <FaBars onClick={toggle} />
            )}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <button onClick={cerrarSesion}>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text" 
            >
              Cerrar Sesion
            </div>
        </button>
      </div>
      <main className="w-full min-h-screen p-2 ">{children}</main>
    </div>
  );
};

export default Sidebar;
