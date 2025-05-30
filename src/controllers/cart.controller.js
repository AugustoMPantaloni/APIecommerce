const sendSuccess = require ("../helpers/responseHelper.js")


class CartController {
    constructor(cartService){
        this.cartService = cartService

        this.addToCart = this.addToCart.bind(this)
        this.increaseQuantity = this.increaseQuantity.bind(this)
        this.emptyCart = this.emptyCart.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
    }

    async addToCart (req, res, next) {
        try {
            const user = req.user;
            const {pId} = req.params;

            const populateCart = await this.cartService.addProductToCart(user, pId);

            sendSuccess(res, {
            message: "Product added successfully",
            cart: populateCart
        }, 200)
        } catch (error) {
            next(error)
        }
    }

    async increaseQuantity (req, res, next){
        try {
            const user = req.user;
            const {pId} = req.params;
            const {quantity} = req.body;

            const updateCart = await this.cartService.quantityProduct(user, pId, quantity)

            sendSuccess(
                res,{
                message: "Cart updated successfully",
                cart: updateCart
            }, 200)
        } catch (error) {
            next(error)
        }
    }

    async emptyCart (req, res, next){
    try {
        const user =  req.user;

        const emptyCart = await this.cartService.emptyCart(user)

        sendSuccess(
            res,{
            message: "Cart emptied successfully",
            cart:emptyCart
        }, 200)
    } catch (error) {
        next(error)
    }
    }

    async removeProduct (req, res, next){
    try {
        const user = req.user;
        const {pId} = req.params;

        const updatedCartItems =  await this.cartService. removeProduct(user, pId)

        sendSuccess(res, {
            message: "Product successfully removed",
            cart : updatedCartItems
        }, 200)
    } catch (error) {
        next(error)
    }
    }
}

module.exports = CartController