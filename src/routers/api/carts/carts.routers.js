//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")
//DAO 
const {cartDao} = require ("../../../factory/factory")
//Controlador generico
const GenericController =  require("../../../controllers/genericController");
const cartControllerGeneric = new GenericController(cartDao);
//Generador de rutas generico
const generateGenericRouter = require ("../../generateGenericRouter");


//Generamos las rutas mediante el generador
const cartsRouter = generateGenericRouter(
    cartControllerGeneric,
    authByRole("user")
);


module.exports = cartsRouter