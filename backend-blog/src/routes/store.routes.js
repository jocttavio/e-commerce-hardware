
const {Router} = require('express');
const { getPlomeria,
  getProduct,
  getHerreria,
  getElectro,
  getAlba,
  createPlomeria,
  createHerreria,
  createElectro,
  createAlba} = require('../controllers/store.controller');


const router = Router();
/*Creamos la ruta principal que es un get la cual va a obtener datos*/
router.get('/plomeria', getPlomeria );
router.get('/herreria',getHerreria );
router.get('/electricidad',getElectro );
router.get('/alba',getAlba );

router.get('/catalogo/:id',getProduct );
router.post('/plomeria', createPlomeria);
router.post('/herreria', createHerreria);
router.post('/electricidad', createElectro);
router.post('/alba', createAlba);

module.exports = router;