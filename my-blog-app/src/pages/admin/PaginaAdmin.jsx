import React, { useEffect,useCallback } from "react";
import {  useState } from "react";
import Cookies from "universal-cookie";
// import { InfoUser } from "./users/infoUser";
 
const PaginaAdmin = () => {
  const cookies = new Cookies();

  const [info, setInfo] = useState([{}])

    // Comprobar si ya inicio Session
        const checkSignIn = useCallback(() => {
      //TODO: Agregar nombre de usuario
      const status = cookies.get("status_usuario");
      const nameUser = cookies.get("nombre");
      const curpUser = cookies.get("curp");
      if (status)
        return setInfo({
          nameUser: nameUser,
          curp: curpUser,
          status: status,
        });
  
        setInfo(false);
    },[info]);
    useEffect(() => {
      checkSignIn();
    }, [checkSignIn])
    
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="">
        <h1 className="p-10 text-5xl font-bold text-center">¡Bienvenido {info.nameUser}!</h1>
      </div>
    </div>
  );
};

export default PaginaAdmin;
