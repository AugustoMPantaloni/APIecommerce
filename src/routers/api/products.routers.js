const authByRole = require("../../middleware/authByRole")

//Manger
const  {productManager } = require ("../../dao/manager");

//Controlador generico
const GenericController = require ("../../controllers/genericController");
const ProductControllerGeneric = new GenericController(productManager)

//Generador de rutas generico
const generateGenericRouter = require("../../helpers/generateGenericRouter");

//Generamos las rutas mediante el generador 
const productsRouter = generateGenericRouter(
    ProductControllerGeneric,
    authByRole("admin")
);

module.exports = productsRouter;