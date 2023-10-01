import React from "react";
import estrella from "../img/estrella.svg";
import "../styles/cards.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate, NavLink } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Cards = ({
  title,
  price,
  priceNow,
  description,
  stars,
  image,
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
  object,
  allPedido, setAllPedido
}) => {
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  // Comprobar si ya inicio Session
  const {showSignIn} = useContext(UserContext);
  // console.log(showSignIn.status);
  const showMessage = () => {
    // if(showSignIn.status) onAddProduct(product)
  };


  // Agregar producto al carrito
  const onAddProduct = (object) => {
    handleClickOpen();
    //Si los productos seleccionados para comprar son iguales solo se aumenta el contador, si no se agrega como
    // un nuevo producto
    setAllPedido([...allPedido, object]);

    if (allProducts.find((item) => item.id_producto === object.id_producto)) {
      const products = allProducts.map((item) =>
        // Funciona como contador
        item.id_producto === object.id_producto
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + object.precio_descuento * object.quantity);
      setCountProducts(countProducts + object.quantity);
      return setAllProducts([...products]);
    }
    
    setTotal(total + object.precio_descuento * object.quantity);
    setCountProducts(countProducts + object.quantity);
    setAllProducts([...allProducts, object]);
  };

  //Producir estrellas
  var star = [...Array(stars)].map((x) => 0);
  return (
    <div>
      <div className="duration-200 delay-75 cards hover:cursor-pointer hover:scale-100 hover:-translate-y-4">
        <div className="cards_item">
          <div className="card">
            <div className="card_image">
              <img src={require(`../img/${image}`)} alt="Imagen" />
            </div>
            <div className="card_content">
              <h2 className="card_title">{title}</h2>
              <div className="flex justify-center estrellas">
                {star.map((num, index) => {
                  return (
                    <div key={index}>
                      <img
                        className="icon"
                        width={40}
                        src={estrella}
                        alt="estrella"
                      />
                    </div>
                  );
                })}
              </div>
              <ul className="card_text">
                <li>{price}</li>
                <li className="text-2xl font-bold text-green-400">
                  {priceNow}
                </li>
                <li>{description}</li>
              </ul>
              {showSignIn.status ? (
                // <button
                //   className="btn card_btn"
                //   onClick={() => onAddProduct(object)}
                // >
                //   Comprar
                // </button>
                <div>
                <button
               className="btn card_btn"
               onClick={() => onAddProduct(object)}
             >
               Comprar
             </button>
               <Dialog
                 open={open}
                 TransitionComponent={Transition}
                 keepMounted
                 onClose={handleClose}
                 aria-describedby="alert-dialog-slide-description"
               >
                 <DialogTitle>
                   {"Se ha agregado al carrito"}
                 </DialogTitle>
                 <DialogContent>
                   <DialogContentText id="alert-dialog-slide-description">
                Puede revisar en su carrito su producto añadido
                   </DialogContentText>
                 </DialogContent>
                 <DialogActions>
                   <Button onClick={handleClose}>Aceptar</Button>
                 </DialogActions>
               </Dialog>
             </div>
              ) : (
                <div>
                   <button
                  className="btn card_btn"
                  onClick={handleClickOpen}
                >
                  Comprar
                </button>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>
                      {"¡No has iniciado sesión!"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Necesitas iniciar sesión antes de empezar a comprar, si aún no tiene una cuenta
                        puede registrarse, si no inicie sesión.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Registrarse</Button>
                    <NavLink to={"/login_user"} onClick={handleClose}>
                      <Button >Iniciar Sesión</Button>
                      </NavLink>
                      
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
