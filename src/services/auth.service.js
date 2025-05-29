class AuthService {
    constructor (cartDao, userDao){
        this.cartDao = cartDao;
        this.userDao = userDao;
    }

    async registerUser (user){
        const newCart = await this.cartDao.createOne();
        await this.userDao.updateById(user._id, {cart: newCart._id});

        const UpdateUser  = await this.userDao.readById(user._id)
        return UpdateUser;
    }
}

module.exports = AuthService;