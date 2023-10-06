const { Router } = require("express");
const {
  getValidateAccount,
  getAccounts,
  InsertAccount,
  DeleteAccount,
  UpdateAccount,
  getUserData,
  InsertUserData,
  UpdateUserData,
  deleteInfoUser,


  getAllProduct,
  getProducts,
  insertProduct,
  getProductId,
  deleteProduct,

  getAllPedidos,
  getPedido,
  createPedido,
  createDetalles,
  getDetalles,

  getProviderData,
  deleteProveedor


} = require("../controllers/store.controller");

const {insertBlockAccount, getValidateBlockAccount, updateAccountSessions,deleteBlockUser} = require('../controllers/user.controller');
const router = Router();


// Rutas para el login 
router.get('/block-account/:email', getValidateBlockAccount);
router.post('/insert-block-account', insertBlockAccount);
router.put('/update-sessions/:id_account', updateAccountSessions);
router.delete('/delete-block-user/:id_account', deleteBlockUser);
//rutas para realizar acciones en las cuentas de usuarios
router.get('/validate_account/:useremail,:password', getValidateAccount);
router.get('/get_accounts', getAccounts);
router.post('/insert_account', InsertAccount);
router.put('/update_account/:id_account', UpdateAccount);
router.delete('/delete_account/:id_account', DeleteAccount);

//rutas para realizar acciones en la informacion de los usuarios
router.get('/get_user/:iduser', getUserData);
router.post('/insert_user', InsertUserData);
router.put('/update_user/:iduser', UpdateUserData);
router.delete('/delete_info/:fk_info', deleteInfoUser);

/*Creamos la ruta principal que es un get la cual va a obtener datos*/


router.get("/getAllProduct", getAllProduct);
router.get("/productos/:categoria", getProducts);
router.post('/insert_producto', insertProduct);
router.get("/productos_id/:id_producto", getProductId);
router.delete("/deleteProducto/:id_producto", deleteProduct);

// TODO:PEDIDOS
router.get("/allPedidos", getAllPedidos);
router.post("/pedido", createPedido);
router.get("/pedido/:fk_cliente", getPedido);
router.post("/detalles",createDetalles)
router.get("/detalles/:id_pedido", getDetalles);

// TODO:Proveedores
router.get("/proveedores", getProviderData);
router.delete("/deleteProveedor/:id_proveedor", deleteProveedor);

deleteProveedor
module.exports = router;
