//manager 
const {cartManager, productManager} = require("../../../manager/manager")
//Helper para respuestas estandar
const sendSuccess = require("../../../helpers/responseHelper")
//Middleware para validar token (para personalizar errores)
const checkTokenExists = require ("../../../middleware/checkTokenExist");
//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")
//Servicios de cart
const CartService = require ("../../../services/cart.service")
const cartService = new CartService(cartManager, productManager)

//Rutas
const {Router} = require ("express");
const personalizedCartRouter = Router()

//Agregar productos al carrito
personalizedCartRouter.post("/addToCart/:pId", checkTokenExists, authByRole("user"), async (req, res, next) => {
    try {
        const user = req.user;
        const {pId} = req.params;

        await cartService.addProductToCart(user, pId);

        sendSuccess(res, {
            message: "Product added successfully"
        }, 200)
    } catch (error) {
        next(error)
    }
})

module.exports = personalizedCartRouter