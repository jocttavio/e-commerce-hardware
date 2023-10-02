import React from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { expression } from "../helpers/regular_expresion";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {DB_URL} from './config';
const LoginUser = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
// 
  const [credential, setCredential] = useState({
    useremail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      expression.email.test(credential.useremail) &&
      expression.password.test(credential.password)
    ) {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/${credential.useremail},${credential.password}`
        );
        const { data: accountUser } = response;
        const { data: userData } = await axios.get(
          `http://localhost:4000/get_user/${accountUser.fk_informacion}`
        );
        cookies.set("status_usuario", true, { path: "/" });
            cookies.set("nombre", userData.nombre_usuario, { path: "/" });
            cookies.set("tipo_usuario", accountUser.tipo_usuario, { path: "/" });
            cookies.set("id", accountUser.id_usuario, { path: "/" });
            cookies.set("curp", accountUser.fk_informacion, { path: "/" });
            navigate("/");
      } catch (error) {
        return alert("El correo o la contraseña son incorrectas");
      }
      setLoading(false);
    } else {
      alert("Los datos proporcionado no cumplen con un formato correcto");
    }
  };
  return (
    <div className="">
      <div className="relative flex justify-center">
        <div className="absolute top-2 left-2">
        <div lassName='w-10 cursor-pointer'  onClick={() => navigate('/')} alt="icon_back">
        <ArrowBackIcon/>
        </div>
        </div>

        <div className="mt-32">
          <form
            className="px-10 container-form py-14"
            onSubmit={handleSubmit}
          >
            <h3 className="TitleLogin">Bienvenido<br/> Ingresa tus credenciales</h3>

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
