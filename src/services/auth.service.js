class AuthService {
    constructor (cartManager, userManager){
        this.cartManager = cartManager;
        this.userManager = userManager;
    }

    async registerUser (user){
        const newCart = await this.cartManager.createOne();
        await this.userManager.updateById(user._id, {cart: newCart._id});

        const UpdateUser  = await this.userManager.readById(user._id)
        return UpdateUser;
    }
}

module.exports = AuthService;