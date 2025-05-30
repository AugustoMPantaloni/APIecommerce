//Dao
const {cartDao, userDao} = require ("../../../factory/factory")

//Repository
const CartRepository = require("../../../repository/carts.repository")
const cartRepository = new CartRepository (cartDao)

const UserRepository = require ("../../../repository/users.repository")
const userRepository = new UserRepository(userDao)

//Services
const AuthService = require ("../../../services/auth.service")
const authService  = new AuthService (cartRepository, userRepository)

//Contoller
const AuthController = require("../../../controllers/auth.controller")
const authController =  new AuthController(authService)

//Rutas
const {Router} = require ("express")
const authRouter = Router();

//Registrar usuario
authRouter.post("/register", authController.registerUser)

//logear usurio
authRouter.post("/login", authController.loginUser)

//Verifica usuario activo
authRouter.get("/current", authController.currentUser)

//deslogear usuario
authRouter.post("/logout", authController.logoutUser)


module.exports= authRouter;

