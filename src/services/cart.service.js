class CartService {
    constructor(cartManager, productManager){
        this.cartManager = cartManager;
        this.productManager = productManager;
    }

    //Agrega un producto al carrito, si ya existe aumenta su cantidad
    async addProductToCart (user, pId){
        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        const cart = await this.cartManager.readById(user.cart);
        if(!cart) throw new Error("Cart not found.");

        const product = await this.productManager.readById(pId);
        if(!product) throw new Error("Product not found.");

        const existsProduct  = cart.items.find (p => p.product.toString() === pId);
        if(existsProduct){
            existsProduct.quantity += 1;
        } else{
            cart.items.push({product: pId, quantity: 1})
        }

        await this.cartManager.updateById(user.cart, { items: cart.items });
        const populateCart = await this.cartManager.readByIdPopulate(cart, {path:"items.product", select:"title price" })
        return populateCart
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

        const productExist = cart.items.find(p => p.product.toString() === pId)
        if(productExist){
            if(productExist.quantity + qty > product.stock){
                throw new Error("There is not enough stock")
            }
            productExist.quantity += qty;
            } else { 
                if(qty > product.stock){
                    throw new Error("There is not enough stock")
                }
                cart.items.push({
                    product: pId,
                    quantity: qty
                })
            }

        await this.cartManager.updateById(cart._id, {items: cart.items})
        const populateCart = await this.cartManager.readByIdPopulate(cart, {path:"items.product", select:"title price" })

        return populateCart;
    }

    //Vaciar el carrito de compras
    async emptyCart(user){

        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");
        
        const cart = await this.cartManager.readById(user.cart)
        if(!cart) throw new Error("Cart not found.")

        const emptyCart = await this.cartManager.updateById(cart._id, {items: []});

        return emptyCart;
    }

    //Elimina un solo producto del carrito de compras
    async removeProduct(user, pId){

        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");
        
        const cart = await this.cartManager.readById(user.cart)
        if(!cart){
            throw new Error("Cart not found.")
        }

        if(!pId){
            throw new Error("Product not found.")
        }

        const originalLength = cart.items.length
        
        const remainingProducts = cart.items.filter(p => p.product.toString() !== pId)
        if(remainingProducts.length === originalLength){
            throw new Error("The product could not be deleted or the product does not exist in the cart.")
        }

        const updatedCartItems =  await this.cartManager.updateById(cart._id, {items: remainingProducts})
        return updatedCartItems
    }
}

module.exports = CartService;