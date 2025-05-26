//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")
//manager 
const {cartManager} = require("../../../manager/manager")
//Controlador generico
const GenericController =  require("../../../controllers/genericController");
const cartControllerGeneric = new GenericController(cartManager);
//Generador de rutas generico
const generateGenericRouter = require ("../../generateGenericRouter");


//Generamos las rutas mediante el generador
const cartsRouter = generateGenericRouter(
    cartControllerGeneric,
    authByRole("user")
);


module.exports = cartsRouter