class cartRepository {
    constructor(cartDao){
        this.cartDao = cartDao
    }

    createOne = async (data) => await this.cartDao.createOne(data);

    readAll = async (filter) => await this.cartDao.readAll(filter);

    readBy = async (filter) => {
        const cart = await this.cartDao.readBy(filter);
        return cart;
    }

    readById = async (id) => {
        const cart = await this.cartDao.readById(id);
        return cart;
    }

    readByIdPopulate = async (id, populateOptions) => {
        const cart = await this.cartDao.readByIdPopulate(id, populateOptions);
        return cart;
    }

    updateById = async (id, data) => {
        const updatedCart = await this.cartDao.updateById(id, data);
        if(!updatedCart) throw new Error("Cart not found.");
        return updatedCart;
    }

    deleteById = async (id) => {
        const deletedCart = await this.cartDao.deleteById(id);
        if(!deletedCart) throw new Error("Cart not found.");
        return deletedCart;
    }
}

module.exports = cartRepository;
