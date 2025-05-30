//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")
//Dao
const {userDao} = require ("../../../factory/factory")

//Repository
const GenericRepository = require ("../../../repository/generic.repository")
const userRepository = new GenericRepository(userDao)

//Services
const GenericService = require ("../../../services/generice.service")
const userService = new GenericService(userRepository)

//Controlador generico
const GenericController =  require("../../../controllers/genericController");
const userController = new GenericController(userService);
//Generador de rutas generico
const generateGenericRouter = require ("../../generateGenericRouter");


//Generamos las rutas mediante el generador
const usersRouter = generateGenericRouter(
    userController,
    authByRole("admin")
);


module.exports = usersRouter