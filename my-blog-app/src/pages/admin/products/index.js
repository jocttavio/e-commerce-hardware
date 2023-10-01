import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Products = () => {
  const [productData, setProducttData] = useState([{
    id_producto: 1,
    nombre_producto: "",
    categoria_product: "",
    precio_producto: "",
    precio_descuento: "",
    descripcion_producto: "",
    existencias: ""
  }]);

  const loadProducts = async () => {
    const { data: response } = await axios.get(
      "http://localhost:4000/getAllProduct"
    );
    setProducttData(response);
  };

  const deleteProducts = async (e,id)=>{
    try {
      await axios.delete(`http://localhost:4000/deleteProducto/${id}`)
     const data =  productData.filter(product => product.id_producto !== id);
     setProducttData(data)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    // Function
    loadProducts();
  }, []);


  return (
    <div className="w-full ">
      <div className="m-10">
        <h1 className="text-4xl font-bold">Productos</h1>
        <div className="mt-10">
          <Button
            color="success"
            variant="contained"
            size="medium"
            type="submit"
          >
            <NavLink to={"/insert_producto"}>Añadir Producto</NavLink>
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <table>
          <tr>
            <th>ID</th>
            <th>Nombre del Producto</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Descripcion</th>
            <th>Existencias</th> 
               <th>Operaciones</th>
            
          </tr>
          {
            productData.map((product) => (
              <tr>
                <td>{product.id_producto}</td>
                <td>{product.nombre_producto}</td>
                <td>{product.categoria_product}</td>
                <td>${product.precio_descuento}</td>
                <td>{product.descripcion_producto}</td>
                <td>{product.existencias}</td>
                <td>
                  <div className="flex justify-center">
                    <div className="p-2">
                      <Button
                        color="success"
                        variant="contained"
                        size="medium"
                        type="submit"
                      >
                        <NavLink to={`/editar_producto/${product.id_producto}`}>Editar</NavLink>
                      </Button>
                    </div>
                    <div className="p-2">
                      <Button variant="contained" size="medium" type="submit">
                        <NavLink to={`/info_products/${product.id_producto}`}>
                          Ver mas informacion
                        </NavLink>
                      </Button>
                    </div>
                    <div>
                      {product.tipo_usuario === "cliente" ? (
                        <></>
                      ) : (
                        <div className="p-2" onClick={(e)=> deleteProducts(e,product.id_producto)}>
                        <Button
                          color="error"
                          variant="contained"
                          size="medium"
                          type="submit"
                        >
                          {/* <NavLink to={`/Pagina_Admin`}>Eliminar</NavLink> */}
                          Eliminar
                        </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  )
}
