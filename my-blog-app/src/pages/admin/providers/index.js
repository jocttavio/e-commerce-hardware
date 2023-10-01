import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Providers = () => {
  const [providerData, setProviderData] = useState([{
    id_proveedor: "",
    nombre_empresa: "",
    direccion_empresa: "",
    telefono_empresa: "",
    correo_empresa: "",
  }]);

  const loadProviders = async () => {
    const { data: response } = await axios.get(
      "http://localhost:4000/proveedores"
    );
    setProviderData(response);
  };

  const deleteProvider = async (e,id)=>{
    try {
      await axios.delete(`http://localhost:4000/deleteProveedor/${id}`)
     const data =  providerData.filter(provider => provider.id_proveedor !== id);
     setProviderData(data)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    // Function
    loadProviders();
  }, []);


  return (
    <div className="w-full ">
      <div className="m-10">
        <h1 className="text-4xl font-bold">Proveedores</h1>
        <div className="mt-10">
          <Button
            color="success"
            variant="contained"
            size="medium"
            type="submit"
          >
            <NavLink to={"/insert_usuarios"}>Añadir Proveedor</NavLink>
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <table>
          <tr>
            <th>ID</th>
            <th>Nombre del Proveedor</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Operaciones</th>

          </tr>
          {
            providerData.map((provider) => (
              <tr>
                <td>{provider.id_proveedores}</td>
                <td>{provider.nombre_empresa}</td>
                <td>{provider.direccion_empresa}</td>
                <td>{provider.telefono_empresa}</td>
                <td>{provider.correo_empresa}</td>
                <td>
                  <div className="flex justify-center">
                    {/* <div className="p-2">
                      <Button
                        color="success"
                        variant="contained"
                        size="medium"
                        type="submit"
                      >
                        <NavLink to={`/editar_usuario/${provider.fk_informacion},${provider.correo_usuario},${provider.password_usuario} $`}>Editar</NavLink>
                      </Button>
                    </div> */}
                    <div>
                        <div className="p-2" onClick={(e)=> deleteProvider(e,provider.id_proveedor)}>
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
