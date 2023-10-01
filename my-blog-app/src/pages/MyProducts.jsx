import React, { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";

export const MyProducts = () => {
  const [pedido, setPedido] = useState();
  // const [allProducts, setAllProducts] = useState([]);
  const [detalles, setDetalles] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [countProducts, setCountProducts] = useState(0);
  // Comprobar si ya inicio Session
  const { showSignIn } = useContext(UserContext);

  const getPedidos = async () => {
    const { data: response } = await axios.get(
      `${DB_URL}/pedido/${showSignIn.curp}`
    );
    setPedido(response);
  };
  // const getDetalles = async () => {
  //   const { data: response } = await axios.get(
  //     `${DB_URL}/detalles/${id}`
  //   );

  //   setDetalles(response);
  // };

  const handleDetalles = async (id) => {
    console.log(id);
    const { data: response } = await axios.get(
      `${DB_URL}/detalles/${id}`
    );
    // console.log(response);
    setDetalles(response);
    console.log(detalles);
    // newReduceProduct(response);
  };

//   const newReduceProduct = async (array) => {
//     // Vamos a buscar los productos que ya se repiten
//     const duplicados = array.filter((objeto, indice) => {
//       if(array.findIndex((item) => item.id_product === objeto.id_product) !== indice){
// setDetalles(...detalles, item.cantidad = item.cantidad + 1  )
//       }else{
//         setAllProducts(...detalles, item)
//       }
//     });
//   console.log(duplicados);
//   };
//   function sameObjects(objeto1, objeto2) {
//     // Compara las propiedades de los objetos
//     // Si todas las propiedades son iguales, los objetos se consideran iguales
//     // Puedes ajustar la lógica de comparación según tus necesidades
//     console.log(objeto1);
//     console.log(objeto2);
//     return (
//       JSON.stringify(objeto1.id_product) === JSON.stringify(objeto2.id_product)
//     );
//   }

  // const reduceProducts = async (object, id) => {
  //   console.log(object);

  //   if (object) {
  //     if (detalles.find((item) => item.id_product === object.id_product)) {
  //       const products = detalles.map((item) =>
  //         // Funciona como contador
  //         item.id_product === object.id_product
  //           ? { ...item, cantidad: item.cantidad + 1 }
  //           : item
  //       );
  //       setTotal(total + object.price_product * object.cantidad);
  //       setCountProducts(countProducts + object.cantidad);
  //       console.log(total);
  //       console.log(countProducts);
  //       setAllProducts([...products]);
  //     } else {
  //       setTotal(total + object.price_product * object.cantidad);
  //       setCountProducts(countProducts + object.cantidad);
  //       setAllProducts([...allProducts, object]);
  //     }
  //   } else {
  //     console.log("muy mal");
  //   }
  // };
  // console.log(detalles);
  // console.log(allProducts);
  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <div className="m-10">
      <div>
        <h1 className="text-2xl font-bold">Mis pedidos</h1>
      </div>
      <div>
        {pedido?.map((item, index) => (
          <div
            className="grid h-20 grid-cols-3 mt-2 text-black bg-gray-400 rounded-md shadow-xl"
            key={index}
          >
            <div className="flex items-center justify-center">
              <h1 className="text-xl text-center">
                Cantidad de productos:{" "}
                <strong>{item.cantidad_productos}</strong>
              </h1>
              {/* <Image 
                src={"/"+atraction.imagen_ubicacion}
                 width={100} height={50} alt="img_atraccion"/> */}
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-center">
                Precio de la compra: <strong>{item.total}</strong>
              </h1>
              <h1 className="text-xl text-center">
                Fecha de la compra: <strong>{item.fecha}</strong>
              </h1>
            </div>
            <div className="flex items-center justify-center font-semibold">
              <button
                className="p-4 ml-4 bg-blue-900 rounded-lg"
                onClick={() => handleDetalles(item.id_pedido)}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
