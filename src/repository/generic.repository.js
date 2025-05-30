/**
* GenericRepository
*
* Repositorio genérico que actúa como capa intermedia entre el DAO y el servicio,
* manejando operaciones CRUD y controlando la existencia de los datos.
*
* Constructor:
* - Recibe una instancia de DAO (Data Access Object) para acceder a la base de datos.
*
* Métodos disponibles:
* - createOne(data)              → Crea un nuevo documento.
* - readAll(filter)              → Obtiene múltiples documentos según un filtro.
* - readBy(filter)               → Obtiene un único documento por filtro. Lanza error si no existe.
* - readById(id)                → Obtiene un documento por ID. Lanza error si no existe.
* - readByIdPopulate(id, options) → Obtiene un documento por ID con población. Lanza error si no existe.
* - updateById(id, data)         → Actualiza un documento por ID. Lanza error si no existe.
* - deleteById(id)               → Elimina un documento por ID. Lanza error si no existe.
*
* Manejo de errores:
* - En todos los métodos que buscan un documento (readBy, readById, updateById, deleteById),
*   si no se encuentra el documento, lanza un error "Item not found.".
*
* Ventajas:
* - Centraliza la validación de existencia de datos para evitar código repetido en servicios o controladores.
* - Facilita la gestión de errores en la capa de acceso a datos.
* - Es reutilizable para cualquier modelo o DAO que implemente los métodos CRUD básicos.
*/


class GenericRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createOne = async (data) => await this.dao.createOne(data);

    readAll = async (filter) => await this.dao.readAll(filter);

    readBy = async (filter) => {
        const item = await this.dao.readById(filter); // Corregido
        if (!item) throw new Error("Item not found.");
        return item;
    }

    readById = async (id) => {
        const item = await this.dao.readById(id);
        if (!item) throw new Error("Item not found.");
        return item;
    }

    readByIdPopulate = async (id, populateOptions) => {
        const item = await this.dao.readByIdPopulate(id, populateOptions); // Corregido
        if (!item) throw new Error("Item not found.");
        return item;
    }

    updateById = async (id, data) => {
        const updatedItem = await this.dao.updateById(id, data); // Corregido
        if (!updatedItem) throw new Error("Item not found.");
        return updatedItem;
    }

    deleteById = async (id) => {
        const itemDeleted = await this.dao.deleteById(id);
        if (!itemDeleted) throw new Error("Item not found.");
        return itemDeleted;
    }
}

module.exports = GenericRepository;
