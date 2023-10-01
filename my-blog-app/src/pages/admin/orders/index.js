import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Orders = () => {
  const [orderData, setOrderData] = useState([{
    id_pedido: 1,
    fk_cliente: "",
    fecha: "",
    total: "",
    cantidad_productos: "",
  }]);

  const loadOrders = async () => {
    const { data: response } = await axios.get(
      "http://localhost:4000/allPedidos"
    );
    setOrderData(response);
  };

  useEffect(() => {
    // Function
    loadOrders();
  }, []);


  return (
    <div className="w-full ">
      <div className="m-10">
        <h1 className="text-4xl font-bold">Pedidos</h1>
      </div>
      <div className="mt-10">
        <table>
          <tr>
            <th>ID</th>
            <th>ID del cliente</th>
            <th>Total</th>
            <th>Cantidad de Productos</th>
            <th>Fecha</th>
            <th>Operaciones</th>
          </tr>
          {
            orderData.map((product) => (
              <tr>
                <td>{product.id_pedido}</td>
                <td>{product.fk_cliente}</td>
                <td>${product.total}</td>
                <td>{product.cantidad_productos}</td>
                <td>{product.fecha}</td>
                <td>
                  <div className="flex justify-center">
                    <div className="p-2">
                      <Button variant="contained" size="medium" type="submit">
                        <NavLink to={`/info_user/${product.fk_informacion}`}>
                          Ver mas informacion
                        </NavLink>
                      </Button>
                    </div>
                    <div>
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
