const authByRole = require("../../../middleware/authByRole");

//DAO
const {userDao} = require ("../../../factory/factory")

//Controlador generico
const genericController = require ("../../../controllers/genericController");
const userControllerGeneric = new genericController(userDao);

//Generador de rutas generico
const generateGenericRouter = require ("../../generateGenericRouter");

//generamos la ruta mediante el generador
const usersRouter = generateGenericRouter(
    userControllerGeneric,
    authByRole("user")
);

module.exports = usersRouter