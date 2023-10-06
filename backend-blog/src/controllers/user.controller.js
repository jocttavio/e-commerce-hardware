//importamos el pool para poder utilizarlo para la base de datos
const pool = require("../database");



const insertBlockAccount = async (req, res, next) => {
  try {
    const { fk_user, fecha } = req.body;
    const SQL_query = await pool.query(
      "INSERT INTO usuarios_bloqueados (fk_usuario, fecha_bloqueo) VALUES ($1,$2) returning *",
      [fk_user, fecha]
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


const getValidateBlockAccount = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "select id_usuario, n_sesiones from Cuenta_Usuario where Correo_usuario = $1",
      [req.params.email]
    );
    if (SQL_query.rows.length === 0)
      return res.status(404).json({
        message: "El correo no existe en la base de datos",
      });

    const { id_usuario, n_sesiones } = SQL_query.rows[0];
    const queryBlock = await pool.query(
      "select * from usuarios_bloqueados where fk_usuario = $1",
      [id_usuario]
    );

    if (queryBlock.rows.length === 0)
      return res.status(200).json({ status: false, id_usuario ,n_sesiones });

    res.status(200).json({
      status: true,
    });
  } catch (error) {
    next(error);
  }
};


const updateAccountSessions = async (req, res, next) => {
  try {
    const id_account = req.params.id_account;
    const { n_sesiones } = req.body;

    const SQL_query = await pool.query(
      "update Cuenta_usuario set n_sesiones = $1 where id_usuario = $2 returning *",
      [ n_sesiones, id_account]
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


const deleteBlockUser = async (req, res, next) => {
  try {
    const SQL_query = await pool.query(
      "delete from usuarios_bloqueados where fk_usuario = $1",
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


module.exports = {
  insertBlockAccount,
  getValidateBlockAccount,
  updateAccountSessions,
  deleteBlockUser
};
