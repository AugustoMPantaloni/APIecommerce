//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")
//Dao
const {productDao} = require ("../../../factory/factory")

//Repository
const GenericRepository = require ("../../../repository/generic.repository")
const productRepository = new GenericRepository(productDao)

//Services
const GenericService = require ("../../../services/generice.service")
const productService = new GenericService(productRepository)

//Controlador generico
const GenericController =  require("../../../controllers/genericController");
const productController = new GenericController(productService);
//Generador de rutas generico
const generateGenericRouter = require ("../../generateGenericRouter");


//Generamos las rutas mediante el generador
const productsRouter = generateGenericRouter(
    productController,
    authByRole("admin") //Se aplico "admin" porque las rutas "get, /search, /:id" son publicas. Esto para evitar que un USER pueda crear, modificar, eliminar productos
);


module.exports = productsRouter