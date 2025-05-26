class CartService {
    constructor(cartManager, productManager){
        this.cartManager = cartManager;
        this.productManager = productManager;
    }

    async addProductToCart (user, pId){
        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        //Buscar el carrito
        const cart = await this.cartManager.readById(user.cart);
        if(!cart) throw new Error("Cart not found");

        //Buscar el producto
        const product = await this.productManager.readById(pId);
        if(!product) throw new Error("Product not found");

        //Verificamos si ya existe el producto en el carrito
        const existsProduct  = cart.cart.find (p => p.product.toString() === pId);
        if(existsProduct){
            existsProduct.quantity += 1;
        } else{
            cart.cart.push({product: pId, quantity: 1})
        }

        await this.cartManager.updateById(user.cart, { cart: cart.cart });
    }
}

module.exports = CartService;