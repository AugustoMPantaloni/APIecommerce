class userRepository {
    constructor(userDao){
        this.userDao = userDao
    }

    createOne = async (data) => await this.userDao.createOne(data);

    readAll = async (filter) => await this.userDao.readAll(filter);

    readBy = async (filter) => {
        const user = await this.userDao.readBy(filter);
        return user;
    }

    readById = async (id) => {
        const user = await this.userDao.readById(id);
        return user;
    }

    readByIdPopulate = async (id, populateOptions) => {
        const user = await this.userDao.readByIdPopulate(id, populateOptions);
        return user;
    }

    updateById = async (id, data) => {
        const updateduser = await this.userDao.updateById(id, data);
        if(!updateduser) throw new Error("user not found.");
        return updateduser;
    }

    deleteById = async (id) => {
        const deleteduser = await this.userDao.deleteById(id);
        if(!deleteduser) throw new Error("user not found.");
        return deleteduser;
    }
}

module.exports = userRepository;
