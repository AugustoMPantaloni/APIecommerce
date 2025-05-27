class CartService {
    constructor(cartManager, productManager){
        this.cartManager = cartManager;
        this.productManager = productManager;
    }

    //Agrega un producto al carrito, si ya existe aumenta su cantidad
    async addProductToCart (user, pId){
        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        //Buscar el carrito
        const cart = await this.cartManager.readById(user.cart);
        if(!cart) throw new Error("Cart not found.");

        //Buscar el producto
        const product = await this.productManager.readById(pId);
        if(!product) throw new Error("Product not found.");

        //Verificamos si ya existe el producto en el carrito
        const existsProduct  = cart.cart.find (p => p.product.toString() === pId);
        if(existsProduct){
            existsProduct.quantity += 1;
        } else{
            cart.cart.push({product: pId, quantity: 1})
        }

        await this.cartManager.updateById(user.cart, { cart: cart.cart });
    }

    //Aumenta la cantidad de un producto en el carrito, si no existe lo agrega
    async quantityProduct(user, pId, quantity){

        const qty = Number(quantity);

        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        const cart = await this.cartManager.readById(user.cart)
        if(!cart) throw new Error("Cart not found.")
        
        const product = await this.productManager.readById(pId)
        if(!product) throw new Error("Product not found.")
        

        if(qty <= 0 || isNaN(qty)){
            throw new Error("Quantity must be a positive number.")
        }

        const productExist = cart.cart.find(p => p.product.toString() === pId)
        if(productExist){
            if(productExist.quantity + qty > product.stock){
                throw new Error("There is not enough stock")
            }
            productExist.quantity += qty;
            } else { 
                if(qty > product.stock){
                    throw new Error("There is not enough stock")
                }
                cart.cart.push({
                    product: pId,
                    quantity: qty
                })
            }

        await this.cartManager.updateById(cart._id, {cart: cart.cart})
        const populateCart = await this.cartManager.readByIdPopulate(user.cart, {path:"cart.product", select:"title price" })

        return populateCart;
    }

    //Vaciar el carrito de compras
    async emptyCart(user){

        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");
        
        const cart = await this.cartManager.readById(user.cart)
        if(!cart) throw new Error("Cart not found.")

        const emptyCart = await this.cartManager.updateById(cart._id, {cart: []});

        return emptyCart;
    }
}

module.exports = CartService;