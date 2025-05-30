class CartService {
    constructor(cartRepository, productRepository){
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    //Agrega un producto al carrito, si ya existe aumenta su cantidad
    async addProductToCart (user, pId){
        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        const cart = await this.cartRepository.readByIdPopulate(user.cart, { path: "items.product", select: "title price stock" });
        const product = await this.productRepository.readById(pId);

        const existsProduct = cart.items.find(p => p.product._id.toString() === pId);
        if(existsProduct){
            if(existsProduct.quantity + 1 > product.stock){
                throw new Error("There is not enough stock");
            }
            existsProduct.quantity += 1;
        } else {
            cart.items.push({ product: pId, quantity: 1 });
        }

        await this.cartRepository.updateById(user.cart, { items: cart.items });
        return await this.cartRepository.readByIdPopulate(cart, {path:"items.product", select:"title price" })
        
    }

    //Aumenta la cantidad de un producto en el carrito, si no existe lo agrega
    async quantityProduct(user, pId, quantity){
        if(!user) throw new Error("You need to be registered and logged in to add products to your cart.");

        const qty = Number(quantity);
        if(qty <= 0 || isNaN(qty)){
            throw new Error("Quantity must be a positive number.");
        }

        const [cart, product] = await Promise.all([
            this.cartRepository.readById(user.cart),
            this.productRepository.readById(pId)
        ]);

        if (!product) {
            throw new Error("Product not found.");
        }

        const existingProduct = cart.items.find(p => p.product.toString() === pId);
        
        if (existingProduct) {
            if(existingProduct.quantity + qty > product.stock){
                throw new Error("There is not enough stock");
            }
            existingProduct.quantity += qty;
        } else {
            if(qty > product.stock){
                throw new Error("There is not enough stock");
            }
            cart.items.push({ product: pId, quantity: qty });
        }

        await this.cartRepository.updateById(cart._id, { items: cart.items });

        return await this.cartRepository.readByIdPopulate(cart, { path: "items.product", select: "title price" });
    }

    //Vaciar el carrito de compras
    async emptyCart(user){
        if(!user) throw new Error("You need to be registered and logged in to perform this action.");

        const cart = await this.cartRepository.readById(user.cart);
        await this.cartRepository.updateById(cart._id, { items: [] });

        return await this.cartRepository.readByIdPopulate(cart, { path: "items.product", select: "title price" });
    }

    //Elimina un solo producto del carrito de compras
    async removeProduct(user, pId){
        if(!user) throw new Error("You need to be registered and logged in to perform this action.");
        if(!pId) throw new Error("Product ID is required.");

        const cart = await this.cartRepository.readById(user.cart);

        const initialLength = cart.items.length;
        const updatedItems = cart.items.filter(p => p.product.toString() !== pId);

        if(updatedItems.length === initialLength){
            throw new Error("The product does not exist in the cart.");
        }

        await this.cartRepository.updateById(cart._id, { items: updatedItems });

        return await this.cartRepository.readByIdPopulate(cart, { path: "items.product", select: "title price" });
    }
}

module.exports = CartService;