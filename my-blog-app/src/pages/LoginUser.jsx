import React from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { expression } from "../helpers/regular_expresion";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { REACT_APP_DB_URL } from "../config";
const LoginUser = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  //
  const [credential, setCredential] = useState({
    useremail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [contador, setContador] = useState(1);
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const insertBlockAccount = async (id_usuario) => {
    try {
      const currentDate = new Date();
      const prueba = currentDate.toISOString().split("T");
      const fecha = prueba[0];
      const { data: response } = await axios.post(
        `${REACT_APP_DB_URL}/insert-block-account`,
        {
          fk_user: id_usuario,
          fecha,
        }
      );
      console.log(response);
      return;
    } catch (error) {
      console.log(error.message);
      return alert("El correo ingresado no existe");
    }
  };
  const accountBlock = async (email) => {
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_DB_URL}/block-account/${email}`
      );
      console.log(response);
      const { status, id_usuario, n_sesiones } = response;
      return { status, id_usuario, n_sesiones: n_sesiones | 0 };
    } catch (error) {
      console.log(error.message);
      return alert("El correo ingresado no existe");
    }
  };

  const updateUserData = async (value, id_usuario) => {
    try {
      const response = await axios.put(
        `${REACT_APP_DB_URL}/update-sessions/${id_usuario}`,
        {
          n_sesiones: value,
        }
      );
      console.log(response.status);
      return;
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteBlockAccount = async (id_usuario) => {
    try {
      await axios.delete(`${REACT_APP_DB_URL}/delete-block-user/${id_usuario}`);

      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      expression.email.test(credential.useremail) &&
      expression.password.test(credential.password)
    ) {
      try {
        //Una vez bloqueada la cuenta no sera posible acceder, (agregar una logica para recuperar un cuenta)
        // setLoading(prev => !prev);
        // Verificar si el usuario que esta ingresando no esta bloqueado, devolver un false o un true con el numero de sesiones bloqueado = 3
        let { status, id_usuario, n_sesiones } = await accountBlock(
          credential.useremail
        );
       
        if (status) {
          alert("Tu cuenta esta bloqueada por superar el maximo de intentos!");
          return;
        }
        // Verificar el numero de sesiones del empleado.
        // Verificar en la tabla cuantos intentos de sesion tiene para saber si agregarlo o no a la tabla de cuentas bloqueadas
        if (n_sesiones < 3) {
         
          // Verificar usuario..
          const { data: response } = await axios.get(
            `${REACT_APP_DB_URL}/validate_account/${credential.useremail},${credential.password}`
          );
          console.log(response);
          const { ok, user } = response;
          if (ok) {
            const { data: userData } = await axios.get(
              `${REACT_APP_DB_URL}/get_user/${user.fk_informacion}`
            );
            await updateUserData(0, id_usuario);
            // Actualizar atributo
            console.log("contra correcta!!");
            cookies.set("status_usuario", true, { path: "/" });
            cookies.set("nombre", userData.nombre_usuario, { path: "/" });
            cookies.set("tipo_usuario", user.tipo_usuario, { path: "/" });
            cookies.set("id", user.id_usuario, { path: "/" });
            cookies.set("curp", user.fk_informacion, { path: "/" });
            navigate("/");
            return;
          }
          n_sesiones = n_sesiones + 1;
          // Modificar la tabla del usuario(n_sesiones);
          await updateUserData(n_sesiones, id_usuario);
          if (n_sesiones === 3) {
            //  Mandar mensaje y agregar a usuario en cuenta bloqueada
            insertBlockAccount(id_usuario);
            alert(
              "Has rebasado los intentos permitidos tu cuenta ha sido bloqueada!"
            );
            return;
          }
          // Agregar los intentos cada vez que la contrase;a sea incorrecta.
          alert(
            "Contraseña incorrecta, total de intentos fallidos:" +
              "" +
              n_sesiones
          );
          return;
        }
        alert("Tu cuenta esta bloqueada por superar el maximo de intentos!");
        return;
        //
      } catch (error) {
        console.log(error.message);
        // return alert("El correo o la contraseña son incorrectas");
      }
    } else {
      alert("Los datos proporcionado no cumplen con un formato correcto");
    }
  };
  return (
    <div className="">
      <div className="relative flex justify-center">
        <div className="absolute top-2 left-2">
          <div
            className="w-10 cursor-pointer"
            onClick={() => navigate("/")}
            alt="icon_back"
          >
            <ArrowBackIcon />
          </div>
        </div>

        <div className="mt-32">
          <form className="px-10 container-form py-14" onSubmit={handleSubmit}>
            <h3 className="TitleLogin">
              Bienvenido
              <br /> Ingresa tus credenciales
            </h3>

            <div className="">
              <TextField
                className="w-80"
                onChange={handleChange}
                name="useremail"
                id="filled-basic"
                label="Correo electronico"
                size="small"
                variant="filled"
              />
            </div>

            <div className="">
              <TextField
                className="w-80"
                onChange={handleChange}
                name="password"
                size="small"
                id="filled-password-input"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                variant="filled"
              />
            </div>

            <div className="flex flex-col">
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={!credential.useremail || !credential.password}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Ingresar"
                )}
              </Button>
              <div className="mt-10">
                <Button>Registrarse</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
