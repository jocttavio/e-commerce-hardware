import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  // CircularProgress,
  TextField,
  // Autocomplete,
} from "@mui/material";
import axios from "axios";
export const InsertUser = () => {
  const navigate = useNavigate();
  // const [nextForm, setNextForm] = useState(false);
  const { curp_user, correo, password } = useParams();

  const [infoUser, setInfoUser] = useState([
    {
      curp_usuario: "",
      nombre_completo: "",
      apellidop_usuario: "",
      apellidom_usuario: "",
      edad_usuario: "",
      fecha_na_usuario: "",
      sexo_usuario: "",
      estado_usuario: "",
      rfc_usuario: "",
      telefono_usuario: "",
      direccion_usario: "",
    },
  ]);
  // Inputs
  const textField = [
    {
      title: "Nombre del Usuario",
      name: "nombre_completo",
      label: infoUser.nombre_completo ? "" : "Nombre",
      value: infoUser.nombre_completo,
    },

    {
      title: "Apellido Materno",
      name: "apellidom_usuario",
      label: infoUser.apellidom_usuario ? "" : "Materno",
      value: infoUser.apellidom_usuario,
    },
    {
      title: "Curp del Usuario",
      name: "curp_usuario",
      label: infoUser.curp_usuario ? "" : "Curp",
      value: infoUser.curp_usuario,
    },
    {
      title: "Estado",
      name: "estado_usuario",
      label: infoUser.estado_usuario ? "" : "Estado",
      value: infoUser.estado_usuario,
    },
  ];
  const textField2 = [
    {
      title: "Apellido Paterno",
      name: "apellidop_usuario",
      label: infoUser.apellidop_usuario ? "" : "Apellido Paterno",
      value: infoUser.apellidop_usuario,
    },

    {
      title: "Sexo",
      name: "sexo_usuario",
      label: infoUser.sexo_usuario ? "" : "Sexo",
      value: infoUser.sexo_usuario,
    },

    {
      title: "Telefono",
      name: "telefono_usuario",
      label: infoUser.telefono_usuario ? "" : "Numero",
      value: infoUser.telefono_usuario,
    },
    {
      title: "Direccion",
      name: "direccion_usario",
      label: infoUser.direccion_usario
        ? infoUser.direccion_usario
        : "Direccion",
      value: infoUser.direccion_usario,
    },
  ];

  const textFieldAccount = [
    {
      title: "Correo del Usuario",
      name: "correo_usuario",
      label: infoUser.correo_usuario ? "" : "Correo",
      value: infoUser.correo_usuario,
    },
    {
      title: "Contraseña del Usuario",
      name: "password_usuario",
      label: infoUser.password_usuario ? "" : "Contraseña",
      value: infoUser.password_usuario,
    },
  ];

  const loadUser = async (curp) => {
    const res = await axios.get(`http://localhost:4000/get_user/${curp}`);
    const { data: user } = await res;
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
      correo_usuario: correo,
      password_usuario: password,
    });
  };

  const handlerChange = ({ target: { name, value } }) => {
    setInfoUser({ ...infoUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(infoUser);
    try {
       const { data: response_account } = await axios.post(
        `http://localhost:4000/insert_user`,
        {
          curp_u: infoUser.curp_usuario,
          name_u: infoUser.nombre_completo,
          apellp_u: infoUser.apellidop_usuario,
          apellm_u: infoUser.apellidom_usuario,
          age_u: infoUser.edad_usuario,
          birthday_u: infoUser.fecha_na_usuario,
          genre_u: infoUser.sexo_usuario,
          state_u: infoUser.estado_usuario,
          rfc_u: infoUser.rfc_usuario,
          phonenumber_u: infoUser.telefono_usuario,
          address_u: infoUser.direccion_usario,
        }
      );
      
      alert("Se ha ingresado correctamente la informacion, Por favor rellene la siguiente informacion")
      navigate(`/insert_cuenta/${response_account.curp_usuario}`);
    } catch (error) {
      alert(error);
    }
    // const response_information = await axios.post(
    //     `http://localhost:5000/insert_user`,
    //     {
    //         curp_u: User_Information.curp_u,
    //         fk_idcuenta_u: data_account.id_cuenta,
    //         name_u: User_Information.name_u,
    //         apellp_u: User_Information.apellp_u,
    //         apellm_u: User_Information.apellm_u,
    //         age_u: User_Information.age_u,
    //         birthday_u: User_Information.birthday_u,
    //         genre_u: User_Information.genre_u,
    //         state_u: User_Information.state_u,
    //         phonenumber_u: User_Information.phonenumber_u,
    //         address_u: User_Information.address_u
    //     }
    // );
    // const { data: data_informacion } = response_information;

    // if (data_informacion.message) {
    //     alert(data_informacion.message)
    // } else {
    //     cookies.set('status', true, { path: "/" });
    //     cookies.set('id', data_account.id_cuenta, { path: "/" });
    //     cookies.set('rol', data_account.rol_cuenta, { path: "/" });
    //     navigate('/pagina_principal')
    // }
  };

  const updateUser = async (e, id) => {
    try {
      e.preventDefault();
      console.log("entre al metdodo");
      await axios.put(`http://localhost:4000/update_user/${id}`, {
        name_u: infoUser.nombre_completo,
        apellp_u: infoUser.apellidop_usuario,
        apellm_u: infoUser.apellidom_usuario,
        age_u: infoUser.edad_usuario,
        birthday_u: infoUser.fecha_na_usuario,
        genre_u: infoUser.sexo_usuario,
        state_u: infoUser.estado_usuario,
        rfc_u: infoUser.rfc_usuario,
        phonenumber_u: infoUser.telefono_usuario,
        address_u: infoUser.direccion_usario,
      });
      await axios.put(`http://localhost:4000/update_account/${id}`, {
        email_c: infoUser.correo_usuario,
        password_c: infoUser.password_usuario,
      });

      navigate(`/usuarios`);
      // Actualizando Account
    } catch (error) {
      alert(error);
    }

    // await fetch("https://devsmex.com/api/eventos/" + id, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     curp_usuario: infoUser.curp_usuario,
    // nombre_completo: infoUser.nombre_completo,
    // apellidop_usuario:
    // apellidom_usuario:
    // fecha_na_usuario:
    // sexo_usuario:
    // estado_usuario:
    // telefono_usuario:
    // direccion_usario:
    // correo_usuario: infoUser.correo_usuario,
    // password_usuario : infoUser.password_usuario,
    // tipo_usuario: infoUser.tipo_usuario,
    //   }),
    // });
  };

  useEffect(() => {
    if (curp_user) {
      loadUser(curp_user);
    }
  }, []);

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
        <div className="flex items-center justify-center gap-x-4">
          <div>
            <form
              className="form-info"
              onSubmit={
                curp_user ? (e) => updateUser(e, curp_user) : handleSubmit
              }
            >
              <div className="flex ">
                <div className="p-2">
                  {textField.map((field, index) => (
                    <div className="information-infoUser" key={index}>
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
                </div>
                <div className="p-2">
                  {textField2.map((field, index) => (
                    <div className="information-infoUser" key={index}>
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
                </div>
              </div>
              <div>
                {curp_user ? (
                  textFieldAccount.map((field, index) => (
                    <div className="information-infoUser" key={index}>
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
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <label className="my-1">Fecha de naciminento</label>
                <input
                  className="w-40 py-1 border-2 rounded-md outline-2 outline-orange-300 hover:border-orange-300"
                  type="date"
                  onChange={handlerChange}
                  name="fecha_na_usuario"
                  value={infoUser.fecha_na_usuario}
                />
              </div>
              {/* <Link
                to={`/insert_cuenta/${infoUser.curp_usuario}`}
                className="p-4 text-lg font-semibold bg-red-400 rounded-xl"
              > */}
              <div className="flex items-center justify-center mt-2 ">
                <Button
                  className="bg-green-500"
                  variant="contained"
                  size="medium"
                  type="submit"
                  disabled={
                    !infoUser.apellidop_usuario ||
                    !infoUser.apellidom_usuario ||
                    !infoUser.fecha_na_usuario ||
                    !infoUser.sexo_usuario ||
                    !infoUser.direccion_usario
                  }
                >
                  {curp_user ? "Actualizar" : "Agregar"}
                </Button>
              </div>
              {/* </Link> */}
            </form>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};
