//importamos el pool para poder utilizarlo para la base de datos
const pool = require("../database");

//crud de la cuenta del usuario
const getValidateAccount = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "select id_usuario , tipo_usuario, fk_informacion from Cuenta_Usuario where Correo_usuario = $1 and Password_usuario = $2",
      [req.params.useremail, req.params.password]
    );

    if (SQL_query.rows.length === 0)
      return res.status(404).json({
        message: "Correo de usuario o contraseña incorrecto(s)",
      });

    res.status(200).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};

// TODO: CRUD DE LOS USUARIOS

const getAccounts = async (req, res, next) => {
  try {
    const SQL_query = await pool.query("select * from Cuenta_usuario");

    if (SQL_query.rows.length === 0)
      return res.status(404).json({
        message: "No estan disponibles las cuentas de usuario",
      });

    res.status(200).json(SQL_query.rows);
  } catch (error) {
    next(error);
  }
};

const InsertAccount = async (req, res, next) => {
  try {
    const { fk_info, email_c, password_c, role_c } = req.body;
    const SQL_query = await pool.query(
      "INSERT INTO Cuenta_usuario (FK_Informacion, Correo_usuario, Password_usuario, tipo_usuario) VALUES ($1,$2,$3,$4) returning *",
      [fk_info, email_c, password_c, role_c]
    );

    if (SQL_query.rows.length === 0)
      return res.status(400).json({
        message: "No se insertó correctamente la cuenta de usuario",
      });

    res.status(201).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};

const UpdateAccount = async (req, res, next) => {
  try {
    const { email_c, password_c, role_c } = req.body;

    const SQL_query = await pool.query(
      "update Cuenta_usuario set Correo_usuario = $1, Password_usuario = $2 where fk_informacion = $3 returning *",
      [email_c, password_c, req.params.id_account]
    );

    if (SQL_query.rows.length === 0)
      return res.status(400).json({
        message: "No se pudo actualizar la cuenta de usuario",
      });

    return res.status(201).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};

const DeleteAccount = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "delete from Cuenta_usuario where id_usuario = $1",
      [req.params.id_account]
    );

    if (SQL_query.rowCount > 0) {
      return res.status(200).json({ status: "OK" });
    }

    return res.status(404).json({
      message: "Registro no encontrado, no se pudo eliminar cuenta de usuario",
    });
  } catch (error) {
    next(error);
  }
};

//TODO: crud de la informacion de usuario
const getUserData = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "select * from Informacion_usuario where Curp_usuario = $1",
      [req.params.iduser]
    );

    if (SQL_query.rows.length === 0)
      return res.status(404).json({
        message: "La información del usuario no fue encotrada",
      });

    res.status(200).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};

const InsertUserData = async (req, res, next) => {
  try {
    const {
      curp_u,
      name_u,
      apellp_u,
      apellm_u,
      age_u,
      birthday_u,
      genre_u,
      state_u,
      rfc_u,
      phonenumber_u,
      address_u,
    } = req.body;
    const SQL_query = await pool.query(
      "INSERT INTO Informacion_usuario (Curp_usuario, nombre_usuario, Apellidop_usuario, Apellidom_usuario, Edad_usuario, Fecha_na_usuario, Sexo_usuario, Estado_usuario, rfc_usuario, telefono_usuario, direccion_usuario) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *",
      [
        curp_u,
        name_u,
        apellp_u,
        apellm_u,
        age_u,
        birthday_u,
        genre_u,
        state_u,
        rfc_u,
        phonenumber_u,
        address_u,
      ]
    );

    if (SQL_query.rows.length === 0)
      return res.status(400).json({
        message: "No se insertó correctamente la informacion del usuario",
      });

    res.status(201).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};

const UpdateUserData = async (req, res, next) => {
  try {
    const {
      name_u,
      apellp_u,
      apellm_u,
      age_u,
      birthday_u,
      genre_u,
      state_u,
      rfc_u,
      phonenumber_u,
      address_u,
    } = req.body;

    const SQL_query = await pool.query(
      "update Informacion_usuario set nombre_usuario = $1, Apellidop_usuario = $2, Apellidom_usuario = $3, Edad_usuario = $4, Fecha_Na_usuario = $5, Sexo_usuario = $6, Estado_usuario = $7,  rfc_usuario = $8, telefono_usuario = $9, direccion_usuario = $10 where Curp_usuario = $11 returning *",
      [
        name_u,
        apellp_u,
        apellm_u,
        age_u,
        birthday_u,
        genre_u,
        state_u,
        rfc_u,
        phonenumber_u,
        address_u,
        req.params.iduser,
      ]
    );

    if (SQL_query.rows.length === 0)
      return res.status(400).json({
        message: "No se pudo actualizar la cuenta informacion del usuario",
      });

    return res.status(201).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};


const deleteInfoUser = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "delete from Informacion_usuario where curp_usuario = $1",
      [req.params.fk_info]
    );

    if (SQL_query.rowCount > 0) {
      return res.status(200).json({ status: "OK" });
    }

    return res.status(404).json({
      message: "Registro no encontrado, no se pudo eliminar cuenta de usuario",
    });
  } catch (error) {
    next(error);
  }
};




// TODO: MIS PRODUCTOS

const insertProduct = async (req, res, next) => {
  try {
    const {
      nombre_producto,
      categoria_product,
      precio_producto,
      precio_descuento,
      descripcion_producto,
      existencias,
      valoracion_producto,
      imagen_producto,
      quantity,
    } = req.body;
    const SQL_query = await pool.query(
      "INSERT INTO productos (nombre_producto, categoria_product, precio_producto, precio_descuento, descripcion_producto, existencias, valoracion_producto, imagen_producto, quantity) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *",
      [
        nombre_producto,
        categoria_product,
        precio_producto,
        precio_descuento,
        descripcion_producto,
        existencias,
        valoracion_producto,
        imagen_producto,
        quantity,
      ]
    );

    if (SQL_query.rows.length === 0)
      return res.status(400).json({
        message: "No se insertó correctamente la informacion del usuario",
      });

    res.status(201).json(SQL_query.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const allProducts = await pool.query(
      "SELECT * FROM productos WHERE categoria_product = $1 ",
      [categoria]
    );
    res.json(allProducts.rows);
  } catch (error) {
    next(error);
  }
};


const getProductId = async (req, res, next) => {
  try {
    const { id_producto } = req.params;
    const allProducts = await pool.query(
      "SELECT * FROM productos WHERE id_producto = $1",
      [id_producto]
    );
    res.json(allProducts.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "delete from productos where id_producto = $1",
      [req.params.id_producto]
    );

    if (SQL_query.rowCount > 0) {
      return res.status(200).json({ status: "OK" });
    }

    return res.status(404).json({
      message: "Registro no encontrado, no se pudo eliminar cuenta de usuario",
    });
  } catch (error) {
    next(error);
  }
};

// TODO: Pedidos de los clientes

const createPedido = async (req, res, next) => {
  //desestructuramos las propiedas de nuestro objeto json
  const { fk_cliente, fecha, total, cantidad } = req.body;
  //colocamos dentro de un try catch nuestra inserccion
  try {
    const result = await pool.query(
      "INSERT INTO pedidos (fk_cliente,fecha, total,cantidad_productos) VALUES ($1, $2, $3, $4) RETURNING *",
      [fk_cliente, fecha, total, cantidad]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// TODO: Productos vendidos

const createDetalles = async (req, res, next) => {
  //desestructuramos las propiedas de nuestro objeto json
  const { fk_pedido, fk_producto } = req.body;
  //colocamos dentro de un try catch nuestra inserccion
  try {
    const result = await pool.query(
      "INSERT INTO detalles_pedido (fk_pedido, fk_producto) VALUES ($1, $2) RETURNING *",
      [fk_pedido, fk_producto]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// TODO: Pedidos de los clientes

const getPedido = async (req, res, next) => {
  const { fk_cliente } = req.params;
  try {
    const allPedidos = await pool.query(
      "SELECT * FROM pedidos WHERE fk_cliente = $1",
      [fk_cliente]
    );
    res.json(allPedidos.rows);
  } catch (error) {
    next(error);
  }
};

// TODO: DETALLES DE LOS PEDIDOS

const getDetalles = async (req, res, next) => {
  const { id_pedido } = req.params;
  try {
    const allDetalles = await pool.query(
      "SELECT  * FROM obtener_detalles($1)",
      [id_pedido]
    );
    res.json(allDetalles.rows);
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await pool.query("SELECT * FROM productos");

    //hacemos una condicion en caso de que no encuentre ningun resultado
    if (allProduct.rows.length === 0) {
      return res.status(404).json({
        message: "not found",
      });
    }

    //devolvemos el resultado en un objeto json
    res.json(allProduct.rows);
  } catch (error) {
    next(error);
  }
};
const getAllPedidos = async (req, res, next) => {
  try {
    const allPedidos = await pool.query("SELECT * FROM pedidos");
    res.json(allPedidos.rows);
  } catch (error) {
    next(error);
  }
};

// TODO: PROVEEDORES
const getProviderData = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "select * from proveedores"
    );

    if (SQL_query.rows.length === 0)
      return res.status(404).json({
        message: "La información del usuario no fue encotrada",
      });

    res.status(200).json(SQL_query.rows);
  } catch (error) {
    next(error);
  }
};

const deleteProveedor = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "delete from proveedores where id_proveedores = $1",
      [req.params.id_proveedor]
    );

    if (SQL_query.rowCount > 0) {
      return res.status(200).json({ status: "OK" });
    }

    return res.status(404).json({
      message: "Registro no encontrado, no se pudo eliminar cuenta de usuario",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getValidateAccount,
  getAccounts,
  InsertAccount,
  DeleteAccount,
  UpdateAccount,

  getUserData,
  InsertUserData,
  UpdateUserData,
  deleteInfoUser,

  insertProduct,
  getAllProduct,
  getProducts,
  getProductId,
  deleteProduct,

  getAllPedidos,
  getPedido,
  createPedido,
  createDetalles,
  getDetalles,

  getProviderData,
  deleteProveedor
};
