//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")
//Dao
const {cartDao} = require ("../../../factory/factory")

//Repository
const GenericRepository = require ("../../../repository/generic.repository")
const cartRepository = new GenericRepository(cartDao)

//Services
const GenericService = require ("../../../services/generice.service")
const cartService = new GenericService(cartRepository)

//Controlador generico
const GenericController =  require("../../../controllers/genericController");
const cartController = new GenericController(cartService);
//Generador de rutas generico
const generateGenericRouter = require ("../../generateGenericRouter");


//Generamos las rutas mediante el generador
const cartsRouter = generateGenericRouter(
    cartController,
    authByRole("user")
);


module.exports = cartsRouter