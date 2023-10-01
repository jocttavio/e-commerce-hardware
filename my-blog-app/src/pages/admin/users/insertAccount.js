import React from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import {
//   Button,
//   CircularProgress,
//   TextField,
//   Autocomplete,
// } from "@mui/material";
// import axios from "axios";
export const InsertAccount = () => {
  // const navigate = useNavigate();
  // const { curp_user } = useParams();
  // const Options = ["Administrador", "Empleado", "Cliente", ""];

  // const [infoUser, setInfoUser] = useState({
  //   fk_informacion: curp_user,
  //   correo_usuario: "",
  //   password_usuario: "",
  //   tipo_usuario: "",
  // });
  // Inputs
  // const textField = [
  //   {
  //     title: "Correo del Usuario",
  //     name: "correo_usuario",
  //     label: "Nombre",
  //     value: infoUser.correo_usuario,
  //   },

  //   {
  //     title: "Tipo de usuario",
  //     name: "tipo_usuario",
  //     label: "Materno",
  //     value: infoUser.tipo_usuario,
  //   },
  // ];
  // const textField2 = [
  //   {
  //     title: "Contraseña del Usuario",
  //     name: "password_usuario",
  //     label: "Contraseña",
  //     value: infoUser.password_usuario,
  //   },
  // ];

  // const handlerChange = ({ target: { name, value } }) => {
  //   setInfoUser({ ...infoUser, [name]: value });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(infoUser.fk_informacion);
  //   try {
  //     const { data: data_account } = await axios.post(
  //       `http://localhost:4000/insert_account`,
  //       {
  //         fk_info: curp_user,
  //         email_c: infoUser.correo_usuario,
  //         password_c: infoUser.password_usuario,
  //         role_c: infoUser.tipo_usuario,
  //       }
  //     );
  //     alert("Se ha ingresado correctamente la cuenta!");
  //     navigate("/usuarios");
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center px-20">
        <div className="flex justify-start w-full">
          <Link
            to={"/usuarios"}
            className="p-4 text-lg font-semibold bg-red-400 rounded-xl"
          >
            Cancel
          </Link>
        </div>
       
      </div>
    </div>
  );
};
