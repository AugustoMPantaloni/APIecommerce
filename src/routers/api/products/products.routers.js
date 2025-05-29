const authByRole = require("../../../middleware/authByRole")

//DAO
const {productDao} = require ("../../../factory/factory")

//Controlador generico
const GenericController = require ("../../../controllers/genericController");
const ProductControllerGeneric = new GenericController(productDao)

//Generador de rutas generico
const generateGenericRouter = require("../../generateGenericRouter");

//Generamos las rutas mediante el generador 
const productsRouter = generateGenericRouter(
    ProductControllerGeneric,
    authByRole("admin")
);

module.exports = productsRouter;