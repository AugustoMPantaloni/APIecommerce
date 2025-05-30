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

//Controller
const CartController = require("../../../controllers/cart.controller")
const cartController = new CartController(cartService)

//Rutas
const {Router} = require ("express");
const personalizedCartRouter = Router()

//Agrega un producto al carrito, si ya existe aumenta su cantidad
personalizedCartRouter.post("/addToCart/:pId", checkTokenExists, authByRole("user"), cartController.addToCart)

//Aumenta la cantidad de un producto en el carrito, si no existe lo agrega 
personalizedCartRouter.patch("/increaseQuantity/:pId", checkTokenExists, authByRole("user"), cartController.increaseQuantity)

//Vaciar el carrito de compras
personalizedCartRouter.put("/emptyCart", checkTokenExists, authByRole("user"), cartController.emptyCart)

//Elimina un solo producto del carrito de compras
personalizedCartRouter.delete("/removeProduct/:pId", checkTokenExists, authByRole("user"), cartController.removeProduct)

module.exports = personalizedCartRouter