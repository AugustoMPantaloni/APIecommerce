//Middleware de autorizacion
const authByRole = require("../../middleware/authByRole")

//manager 
const {cartManager, productManager} = require("../../dao/manager")

//Controlador generico
const GenericController =  require("../../controllers/genericController");
const cartControllerGeneric = new GenericController(cartManager);

//Generador de rutas generico
const generateGenericRouter = require ("../../helpers/generateGenericRouter");

//Generamos las rutas mediante el generador
const cartsRouter = generateGenericRouter(
    cartControllerGeneric,
    authByRole("user")
);

//Rutas personalizadas

//Helper para respuestas estandar
const sendSuccess = require("../../helpers/responseHelper")

//Middleware para validar token (para personalizar errores)
const checkTokenExists = require ("../../middleware/checkTokenExist");

const {Router} = require ("express")
const cartsActionsRouter = Router()

//Agregar productos al carrito
cartsActionsRouter.post("/addToCart/:pId", checkTokenExists, authByRole("user"), async (req, res, next) => {
    try {
        const user = req.user;
        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        //Buscar el carrito
        const cart = await cartManager.readById(user.cart);
        if(!cart) throw new Error("Cart not found");
        
        //Buscar el producto
        const {pId} = req.params;
        const product = await productManager.readById(pId);
        if(!product) throw new Error("Product not found");

        //Verificamos si ya existe el producto en el carrito
        const existsProduct  = cart.cart.find (p => p.product.toString() === pId);
        if(existsProduct){
            existsProduct.quantity += 1;
        } else{
            cart.cart.push({product: pId, quantity: 1})
        }

        await cartManager.updateById(user.cart, { cart: cart.cart });

        sendSuccess(res, {
            message: "Product added successfully"
        }, 200)
    } catch (error) {
        next(error)
    }
})

module.exports = {
    cartsRouter,
    cartsActionsRouter}