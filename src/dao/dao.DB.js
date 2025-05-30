/** 
*  Generic daoDb Class
*
* Este daoDb genérico permite realizar operaciones CRUD en la DB sobre cualquier modelo de Mongoose,
* de forma reutilizable y desacoplada de la lógica del controlador.
*
* Métodos disponibles:
* - createOne(data)             → Crea un nuevo documento.
* - readAll(filter)             → Obtiene múltiples documentos según un filtro. Usa `.lean()` para mejor rendimiento.
* - readBy(filter)              → Obtiene un único documento por filtro. Usa `.lean()`.
* - readById(id)                → Busca un documento por ID. Usa `.lean()`.
* - updateById(id, data)        → Actualiza un documento por ID. Devuelve el documento actualizado con `.lean()`.
* - deleteById(id)              → Elimina un documento por ID.
*
*  Ventajas:
* - Código DRY (Don't Repeat Yourself)
* - Alta reutilización: sirve para cualquier modelo (productos, carritos, usuarios, etc.)
* - Fácil de extender (paginación, población, validaciones, etc.)
*/

const ProductModel = require ("../models/productsModel");
const CartModel = require ("../models/cartsModel");
const UsersModel = require ("../models/usersModel");

class DaoDb {
    constructor(model){
        this.model = model
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readBy = async (filter) => await this.model.findOne(filter).lean();
    readById = async (id) => await this.model.findById(id).lean();
    readByIdPopulate = async (id, populateOptions) => await this.model.findById(id).populate(populateOptions).lean();
    updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data, {new: true}).lean();
    deleteById = async (id) => await this.model.findByIdAndDelete(id);
}

const productDaoDb = new DaoDb(ProductModel);
const cartDaoDb = new DaoDb(CartModel);
const userDaoDb = new DaoDb(UsersModel);

module.exports = {
    productDaoDb,
    cartDaoDb,
    userDaoDb,
}