const fs = require ("fs/promises")
const path = require ("path")

class daoDbFs {
    constructor(filename){
        this.filepath = path.resolve(__dirname,"", filename)
    }

    createOne = async (data) => {};
    readAll =  async (filter) => {} ;
    readBy = async (filter) => {} ;
    readById = async (id) =>{}
    updateById = async (id, data) => {}
    deleteById = async (id) => {}
}



