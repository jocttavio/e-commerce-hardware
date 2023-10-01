import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export const InfoUser = () => {
  
  const { id_usuario } = useParams();
  const [infoUser, setInfoUser] = useState([{}]);
  const loadUser = async (curp) => {
    const res = await axios.get(`http://localhost:4000/get_user/${curp}`);
    const { data: user } =  res;
    // const res = await axios.get(`https://devsmex.com/${curp}`);
    // const { data: account } = await res;
    setInfoUser({
      curp_usuario: user.curp_usuario,
      nombre_completo: user.nombre_usuario,
      apellidop_usuario: user.apellidop_usuario,
      apellidom_usuario: user.apellidom_usuario,
      fecha_na_usuario: user.fecha_na_usuario,
      sexo_usuario: user.sexo_usuario,
      estado_usuario: user.estado_usuario,
      telefono_usuario: user.telefono_usuario,
      direccion_usario: user.direccion_usuario,
    });
  };

  useEffect(() => {
    if(id_usuario){
      loadUser(id_usuario);
    }
    }, [id_usuario])
  
  return (
    <div className="flex flex-col justify-center ">
          <div className="flex justify-start w-full ">
          <Link
            to={"/usuarios"}
            className="p-4 text-lg font-semibold rounded-xl"
          >
            Regresar
          </Link>
        </div>
      <h1 className="p-5 text-4xl font-bold text-center">
        Informacion del Usuario: {id_usuario}
      </h1>
      <div className="flex justify-center m-10 text-3xl">
        <div className="p-4">
          <ul className="">
          <li>
              <strong>Curp: </strong>
              {infoUser.curp_usuario}
            </li>
            <li>
              <strong>Nombre:</strong>
              {infoUser.nombre_completo}
            </li>{" "}
            <li>
              <strong>Apellido Materno:</strong>
              {infoUser.apellidom_usuario}
            </li>{" "}
            <li>
              <strong>Apellido Paterno:</strong>
              {infoUser.apellidop_usuario}
            </li>{" "}
            {/* <li>
              <strong>Edad:</strong>
              {infoUser.edad_}
            </li>{" "} */}
            <li>
              <strong>Fecha de Nacimiento:</strong>
              {infoUser.fecha_na_usuario}
            </li>{" "}
         
          </ul>
        </div>
        <div className="p-4">
          <ul className="">
          <li>
              <strong>Sexo:</strong>
              {infoUser.sexo_usuario}
            </li>{" "}
            <li>
              <strong>Estado:</strong>
              {infoUser.estado_usuario}
            </li>{" "}
            <li>
              <strong>Telefono:</strong>
              {infoUser.telefono_usuario}
            </li>{" "}
            <li>
              <strong>Direccion:</strong>
              {infoUser.direccion_usario}
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};
