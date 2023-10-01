import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const Users = () => {
  const [accountData, setAccountData] = useState([{
    id_usuario: 1,
    fk_informacion: "CUSM970523MGRRNR02",
    correo_usuario: "mari@gmail.com",
    password_usuario: "psswd",
    tipo_usuario: "cliente",
  }]);

  const loadAccounts = async () => {
    const { data: response } = await axios.get(
      "http://localhost:4000/get_accounts"
    );
    setAccountData(response);
  };

  // Eliminarlas del useState con un filter jeje
  const deleteUser = async (e,id,curp)=>{
    try {
      await axios.delete(`http://localhost:4000/delete_account/${id}`);
      await axios.delete(`http://localhost:4000/delete_info/${curp}`);
      const data = accountData.filter(account => account.id_usuario !== id);
      console.log(data);
      setAccountData(data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    // Function
    loadAccounts();
  }, []);

  return (
    <div className="w-full">
      <div className="m-10">
        <h1 className="text-4xl font-bold">Usuarios</h1>
        <div className="mt-10">
          <Button
            color="success"
            variant="contained"
            size="medium"
            type="submit"
          >
            <NavLink to={"/insert_usuarios"}>Añadir Usuario</NavLink>
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <table>
          <tr>
            <th>ID</th>
            <th>Correo electronico</th>
            <th>Tipo de usuario</th>
            <th>Operaciones</th>
          </tr>
          
          {
            accountData.map((account) => (
              <tr>
                <td>{account.id_usuario}</td>
                <td>{account.correo_usuario}</td>
                <td>{account.tipo_usuario}</td>
                <td>
                  <div className="flex justify-center">
                    <div className="p-2">
                      <Button
                        color="success"
                        variant="contained"
                        size="medium"
                        type="submit"
                      >
                        <NavLink to={`/editar_usuario/${account.fk_informacion},${account.correo_usuario},${account.password_usuario} $`}>Editar</NavLink>
                      </Button>
                    </div>
                    <div className="p-2">
                      <Button variant="contained" size="medium" type="submit">
                        <NavLink to={`/info_user/${account.fk_informacion}`}>
                          Ver mas informacion
                        </NavLink>
                      </Button>
                    </div>
                    <div>
                      {account.tipo_usuario === "cliente" ? (
                        <></>
                      ) : (
                        <div className="p-2" onClick={(e)=> deleteUser(e,account.id_usuario, account.fk_informacion)}>
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
  );
};
