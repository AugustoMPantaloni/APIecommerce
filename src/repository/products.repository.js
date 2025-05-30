class ProductRepository {
    constructor(productDao) {
        this.productDao = productDao;
    }

    async createOne(data) {
        return await this.productDao.createOne(data);
    }

    async readAll(filter) {
        return await this.productDao.readAll(filter);
    }

    readBy = async (filter) => {
    const product = await this.productDao.readBy(filter);
    return product;
    }

    async readById(id) {
        const product = await this.productDao.readById(id);
        return product;
    }

    async readByIdPopulate(id, populateOptions) {
        const product =  await this.productDao.readByIdPopulate(id, populateOptions);
        return product;
    }

    async updateById(id, data) {
        const updateProduct =  await this.productDao.updateById(id, data);
        if(!updateProduct) throw new Error("Product not found.");
        return updateProduct;
    }

    async deleteById(id) {
        const deletedProduct =  await this.productDao.deleteById(id);
        if(!deletedProduct) throw new Error("Product not found.")
        return deletedProduct;
    }
}

module.exports = ProductRepository;
