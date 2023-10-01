import React from "react";
import { Link,  useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export const InfoProduct = () => {
  const { id_producto } = useParams();
  const [infoProduct, setInfoProduct] = useState([
    {
      id_producto: 1,
      nombre_producto: "",
      categoria_product: "",
      precio_producto: 0,
      precio_descuento: 0,
      descripcion_producto: "",
      existencias: 0,
      imagen_producto: "",
      quantity: 1,
      valoracion_producto: null,
    },
  ]);

  const loadProduct = async (id_producto) => {
    const res = await axios.get(
      `http://localhost:4000/productos_id/${id_producto}`
    );
    const { data: product } = await res;
    setInfoProduct({
      nombre_producto: product.nombre_producto,
      categoria_product: product.categoria_product,
      precio_producto: product.precio_producto,
      precio_descuento: product.precio_descuento,
      descripcion_producto: product.descripcion_producto,
      existencias: product.existencias,
      imagen_producto: product.imagen_producto,
      quantity: product.quantity,
      valoracion_producto: product.valoracion_producto,
    });
  };

  useEffect(() => {
    loadProduct(id_producto);
  }, [id_producto]);

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-start w-full ">
        <Link
          to={"/productos"}
          className="p-4 text-lg font-semibold rounded-xl"
        >
          Regresar
        </Link>
      </div>
      <h1 className="p-5 text-4xl font-bold text-center">
        Informacion del Producto: {infoProduct.nombre_producto}
      </h1>
      <div className="flex justify-center m-10 text-3xl">
        <div className="p-4">
          <ul className="">
            <li>
              <strong>id_producto: </strong>
              {infoProduct.id_producto}
            </li>
            <li>
              <strong>Nombre del producto: </strong>
              {infoProduct.nombre_producto}
            </li>
            <li>
              <strong>Categoria del producto: </strong>
              {infoProduct.categoria_product}
            </li>
            <li>
              <strong>Precio: </strong>
              {infoProduct.precio_producto}
            </li>
            <li>
              <strong>Precio descuento: </strong>
              {infoProduct.precio_descuento}
            </li>
          </ul>
        </div>
        <div className="p-4">
          <ul className="">
            <li>
              <strong>Descripcion: </strong>
              {infoProduct.descripcion_producto}
            </li>
            <li>
              <strong>Existencias:</strong>
              {infoProduct.existencias}
            </li>
            <li>
              <strong>Imagen: </strong>
              {infoProduct.imagen_producto}
            </li>
            <li>
              <strong>Valoracion: </strong>
              {infoProduct.valoracion_producto}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
