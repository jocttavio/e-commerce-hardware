
//importamos el pool para poder utilizarlo para la base de datos
const pool = require('../database');

const getPlomeria = async (req, res, next) => {
    try {
      const allProducts = await pool.query('SELECT * FROM plomeria');
      res.json(allProducts.rows);
    }
    catch (error) {
      next(error);
    }
  }

  const getHerreria = async (req, res, next) => {
    try {
      const allProducts = await pool.query("SELECT * FROM herreria");
      res.json(allProducts.rows);
    }
    catch (error) {
      next(error);
    }
  }

  const getElectro = async (req, res, next) => {
    try {
      const allProducts = await pool.query("SELECT * FROM electricidad");
      res.json(allProducts.rows);
    }
    catch (error) {
      next(error);
    }
  }
  
  const getAlba = async (req, res, next) => {
    try {
      const allProducts = await pool.query("SELECT * FROM albañileria");
      res.json(allProducts.rows);
    }
    catch (error) {
      next(error);
    }
  }

  const getProduct = async (req, res, next) => {
    try {
      //desestructuramos el req para obtener el id de nuestra row
      const { id } = req.params;
      const singleProduct = await pool.query('SELECT * FROM "Catalogo" WHERE id_product = $1', [id]);
  
      //hacemos una condicion en caso de que no encuentre ningun resultado
      if (singleProduct.rows.length === 0) {
        return res.status(404).json({
          message: "not found"
        });
      }
  
      //devolvemos el resultado en un objeto json
      res.json(singleProduct.rows[0]);
  
    } catch (error) {
      next(error);
    }
  
  }

const createPlomeria = async (req, res, next) => {
  //desestructuramos las propiedas de nuestro objeto json
  const { id_productp, nombre_product, price_old, price_now, description,stars,image_name } = req.body;
  //colocamos dentro de un try catch nuestra inserccion
  try {
    const result = await pool.query('INSERT INTO plomeria (id_productp,nombre_product, price_old, price_now, description,stars, image_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [ id_productp, nombre_product, price_old, price_now, description,stars,image_name]);
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const createHerreria = async (req, res, next) => {
  //desestructuramos las propiedas de nuestro objeto json
  const { id_producth, nombre_product, price_old, price_now, description,stars,image_name } = req.body;
  //colocamos dentro de un try catch nuestra inserccion
  try {
    const result = await pool.query("INSERT INTO herreria (id_producth, nombre_product, price_old, price_now, description,stars,image_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [id_producth, nombre_product, price_old, price_now, description,stars,image_name]);
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const createElectro = async (req, res, next) => {
  //desestructuramos las propiedas de nuestro objeto json
  const { id_producte, nombre_product, price_old, price_now, description,stars,image_name } = req.body;
  //colocamos dentro de un try catch nuestra inserccion
  try {
    const result = await pool.query("INSERT INTO electricidad (id_producte, nombre_product, price_old, price_now, description,stars,image_name ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [id_producte, nombre_product, price_old, price_now, description,stars,image_name]);
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const createAlba = async (req, res, next) => {
  //desestructuramos las propiedas de nuestro objeto json
  const { id_producta, nombre_product, price_old, price_now, description,stars,image_name } = req.body;
  //colocamos dentro de un try catch nuestra inserccion
  try {
    const result = await pool.query("INSERT INTO albañileria(id_producta, nombre_product, price_old, price_now, description,stars,image_name ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [id_producta, nombre_product, price_old, price_now, description,stars,image_name]);
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}


  module.exports = {
    getPlomeria,
    getProduct,
    getHerreria,
    getElectro,
    getAlba,
    createPlomeria,
    createHerreria,
    createElectro,
    createAlba
  }