import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
export const InsertProduct = () => {
  const navigate = useNavigate();
  const { id_producto } = useParams();
  const Options = ["Herreria", "Plomeria", "Alba;ileria", ""];
  const Valoracion = [1, 2, 3, 4, 5];

  const [infoProducto, setProducto] = useState([{
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
  }]);
  // Inputs
  const textField = [
    {
      title: "Nombre del producto",
      name: "nombre_producto",
      label: infoProducto.nombre_producto ? "" : "Nombre",
      value: infoProducto.nombre_producto,
    },

    {
      title: "Numero de Existencias",
      name: "existencias",
      label: infoProducto.existencias ? "" : "Existencias",
      value: infoProducto.existencias,
      type: "number"
    },
  ];
  const textField2 = [
    {
      title: "Descripcion",
      name: "descripcion_producto",
      label: infoProducto.descripcion_producto ? "" : "Descripcion",
      value: infoProducto.descripcion_producto,
    },
    {
      title: "Imagen del Producto",
      name: "imagen_producto",
      label: infoProducto.imagen_producto ? "" : "Imagen del Producto",
      value: infoProducto.imagen_producto,
    },
    {
      title: "Precio Original",
      name: "precio_producto",
      label: infoProducto.precio_producto ? "" : "Original",
      value: infoProducto.precio_producto,
      type: "number"
    },
    {
      title: "Precio Descuento",
      name: "precio_descuento",
      label: infoProducto.precio_descuento ? "" : "Descuento",
      value: infoProducto.precio_descuento,
      type: "number"
    },
  ];

  const handlerChange = ({ target: { name, value } }) => {
    setProducto({ ...infoProducto, [name]: value });
  };
  const loadProduct = async (id) => {
    const res = await axios.get(`http://localhost:4000/productos_id/${id}`);
    const { data: product } = await res;console.log(product);
    setProducto({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(infoProducto);
    // try {
    //   const { data: response_account } = await axios.post(
    //     `http://localhost:4000/insert_producto`,
    //     {
    //       nombre_producto: infoProducto.nombre_producto,
    //       categoria_product: infoProducto.categoria_product,
    //       precio_producto: infoProducto.precio_producto,
    //       precio_descuento: infoProducto.precio_descuento,
    //       descripcion_producto: infoProducto.descripcion_producto,
    //       existencias: infoProducto.existencias,
    //       imagen_producto: infoProducto.imagen_producto,
    //       quantity: infoProducto.quantity,
    //       valoracion_producto: infoProducto.valoracion_producto,
    //     }
    //   );

    //   alert(
    //     "Se ha ingresado correctamente la informacion, Por favor rellene la siguiente informacion"
    //   );
    //   navigate(`/productos`);
    // } catch (error) {
    //   alert(error);
    // }
  };

  // const updateUser = async (e, id) => {
  //   try {
  //     e.preventDefault();
  //     console.log("entre al metdodo");
  //     await axios.put(`http://localhost:4000/update_user/${id}`, {
  //       name_u: infoUser.nombre_completo,
  //       apellp_u: infoUser.apellidop_usuario,
  //       apellm_u: infoUser.apellidom_usuario,
  //       age_u: infoUser.edad_usuario,
  //       birthday_u: infoUser.fecha_na_usuario,
  //       genre_u: infoUser.sexo_usuario,
  //       state_u: infoUser.estado_usuario,
  //       rfc_u: infoUser.rfc_usuario,
  //       phonenumber_u: infoUser.telefono_usuario,
  //       address_u: infoUser.direccion_usario,
  //     });
  //     await axios.put(`http://localhost:4000/update_account/${id}`, {
  //       email_c: infoUser.nombre_producto,
  //       password_c: infoUser.precio_producto,
  //     });

  //     navigate(`/usuarios`);
  //     // Actualizando Account
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  useEffect(() => {
    if (id_producto) {
      console.log(id_producto);
      loadProduct(id_producto);
    }
  }, []);

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center px-20">
        <div className="flex justify-start w-full">
          <Link
            to={"/productos"}
            className="p-4 text-lg font-semibold bg-red-400 rounded-xl"
          >
            Cancel
          </Link>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <div>
            <form className="form-info" onSubmit={handleSubmit}>
              <div className="flex ">
                <div className="p-2">
                  {textField.map((field, index) => (
                    <div className="information-infoProducto" key={index}>
                      <p>{field.title}</p>
                      <TextField
                        onChange={handlerChange}
                        name={field.name}
                        label={field.label}
                        value={field.value}
                        type={field.type}
                        multiline={field.type ? false : true}
                        fullWidth
                        rows={2}
                        // id="outlined-number"
                        id="outlined-multiline-static"
                        size="small"
                      />
                    </div>
                  ))}
                  <div className="w-96">
                    <Autocomplete
                      options={Options}
                      value={
                        infoProducto.categoria_product === null
                          ? Options[1]
                          : Options[infoProducto.categoria_product]
                      }
                      onChange={(event, newValue) => {
                        setProducto({
                          ...infoProducto,
                          categoria_product: newValue,
                        });
                      }}
                      id="auto-complete"
                      autoComplete
                      autoSelect
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Categoria"
                          variant="standard"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="p-2">
                  {textField2.map((field, index) => (
                    <div className="information-infoProducto" key={index}>
                      <p>{field.title}</p>
                      <TextField
                        onChange={handlerChange}
                        name={field.name}
                        label={field.label}
                        value={field.value}
                        multiline
                        fullWidth
                        rows={2}
                        id="outlined-multiline-static"
                        size="small"
                      />
                    </div>
                  ))}
                  <div className="w-96">
                    <Autocomplete
                      // typeof="number"
                      options={Valoracion}
                      value={Valoracion[infoProducto.valoracion_producto]}
                      onChange={(event, newValue) => {
                        console.log(newValue);
                        console.log(infoProducto.valoracion_producto);
                        setProducto({
                          ...infoProducto,
                          valoracion_producto: newValue,
                        });
                      }}
                      id="auto-complete"
                      autoComplete
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Valoracion"
                          variant="standard"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* <Link
          to={`/insert_cuenta}`}
          className="p-4 text-lg font-semibold bg-red-400 rounded-xl"
        > */}
              <div className="flex items-center justify-center mt-10 ">
                <Button
                  className="bg-green-500"
                  variant="contained"
                  size="medium"
                  type="submit"
                  // disabled={
                  //   !infoProducto.precio_producto ||
                  //   !infoProducto.nombre_producto ||
                  //   !infoProducto.categoria_product ||
                  //   !infoProducto.existencias ||
                  //   !infoProducto.imagen_producto ||
                  //   !infoProducto.precio_descuento ||
                  //   !infoProducto.descripcion_producto ||
                  //   !infoProducto.valoracion_producto
                  // }
                >
                  Agregar
                </Button>
              </div>
            </form>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};
