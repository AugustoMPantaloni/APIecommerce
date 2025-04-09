/* Documentacion *
*  Generic Manager Class
*
* Este Manager genérico permite realizar operaciones CRUD sobre cualquier modelo de Mongoose,
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
*
* Ejemplo de uso:
* const productManager = new Manager(ProductModel);
* const cartManager = new Manager(CartModel);
*/

const ProductModel = require ("../models/productsModel");
const CartModel = require ("../models/cartsModel");

class Manager {
    constructor(model){
        this.model = model
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readBy = async (filter) => await this.model.findOne(filter).lean();
    readById = async (id) => await this.model.findById(id).lean();
    updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data, {new: true}).lean();
    deleteById = async (id) => await this.model.findByIdAndDelete(id);
}

const productManager = new Manager(ProductModel);
const cartManager = new Manager(CartModel)

module.exports = {
    productManager,
    cartManager,
}