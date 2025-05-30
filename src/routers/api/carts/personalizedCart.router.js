//Helper para respuestas estandar
const sendSuccess = require("../../../helpers/responseHelper")
//Middleware para validar token (para personalizar errores)
const checkTokenExists = require ("../../../middleware/checkTokenExist");
//Middleware de autorizacion
const authByRole = require("../../../middleware/authByRole")

//Dao
const {cartDao, productDao} = require ("../../../factory/factory")

//Repository
const CartRepository = require ("../../../repository/carts.repository")
const cartRepository = new CartRepository (cartDao)

const ProductRepository = require ("../../../repository/products.repository")
const productRepository = new ProductRepository (productDao)

//Services
const CartService = require ("../../../services/cart.service")
const cartService = new CartService(cartRepository, productRepository)

//No se usa un controlador porque no aporta mucho en este caso, si la logica crece se implementa.

//Rutas
const {Router} = require ("express");
const personalizedCartRouter = Router()

//Agrega un producto al carrito, si ya existe aumenta su cantidad
personalizedCartRouter.post("/addToCart/:pId", checkTokenExists, authByRole("user"), async (req, res, next) => {
    try {
        const user = req.user;
        const {pId} = req.params;

        const populateCart = await cartService.addProductToCart(user, pId);

        sendSuccess(res, {
            message: "Product added successfully",
            cart: populateCart
        }, 200)
    } catch (error) {
        next(error)
    }
})

//Aumenta la cantidad de un producto en el carrito, si no existe lo agrega
personalizedCartRouter.patch("/quantity/:pId", checkTokenExists, authByRole("user"), async (req, res, next)=>{
    try {
        const user = req.user;
        const {pId} = req.params;
        const {quantity} = req.body;

        const updateCart = await cartService.quantityProduct(user, pId, quantity)

        sendSuccess(
            res,{
            message: "Cart updated successfully",
            cart: updateCart
        }, 200)
    } catch (error) {
        next(error)
    }
})

//Vaciar el carrito de compras
personalizedCartRouter.put("/emptyCart", checkTokenExists, authByRole("user"), async (req, res, next)=>{
    try {
        const user =  req.user;

        const emptyCart = await cartService.emptyCart(user)

        sendSuccess(
            res,{
            message: "Cart emptied successfully",
            cart:emptyCart
        }, 200)
    } catch (error) {
        next(error)
    }
})

//Elimina un solo producto del carrito de compras
personalizedCartRouter.delete("/removeProduct/:pId", checkTokenExists, authByRole("user"), async (req, res, next) =>{
    try {
        const user = req.user;
        const {pId} = req.params;

        const updatedCartItems =  await cartService. removeProduct(user, pId)

        sendSuccess(res, {
            message: "Product successfully removed",
            cart : updatedCartItems
        }, 200)
    } catch (error) {
        next(error)
    }
})

module.exports = personalizedCartRouter