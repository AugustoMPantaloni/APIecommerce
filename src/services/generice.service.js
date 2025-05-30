/**
* GenericService - Servicio genérico para operaciones CRUD
*
* Este servicio proporciona una capa lógica reutilizable sobre cualquier repositorio que
* implemente los métodos estándar (createOne, readAll, readBy, readById, updateById, deleteById).
* Es ideal para desacoplar lógica de negocio básica del controlador y evitar repetición de código.
*
* Métodos disponibles:
* - createOne(data)             → Crea un nuevo documento.
* - readAll(filter)             → Devuelve todos los documentos que coincidan con el filtro.
* - readBy(filter)              → Devuelve un documento que coincida con el filtro.
* - readById(id)                → Devuelve un documento por su ID.
* - updateById(id, data)        → Actualiza un documento por su ID.
* - deleteById(id)              → Elimina un documento por su ID.
*
* Validaciones internas:
* - Verifica que los datos sean objetos válidos.
* - Verifica que los filtros y los IDs sean adecuados.
*
* Ventajas:
* - Reutilizable con cualquier entidad (productos, usuarios, carritos, etc.)
* - Código limpio y DRY.
* - Ideal como punto de partida para extender servicios con lógica específica
*/

class GenericService {
    constructor(repository) {
        this.repository = repository;
    }

    async createOne(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Invalid data: must be a non-array object');
        }
        return await this.repository.createOne(data);
    }

    async readAll(filter) {
        if (filter && typeof filter !== 'object') {
            throw new Error('Invalid filter: must be an object');
        }
        return await this.repository.readAll(filter);
    }

    async readBy(filter) {
        if (!filter) {
            throw new Error('Filter is required');
        }
        if (typeof filter !== 'string' && typeof filter !== 'object') {
            throw new Error('Invalid filter: must be a string or object');
        }
        return await this.repository.readBy(filter);
    }

    async readById(id) {
        if (!id) {
            throw new Error('Id is required');
        }
        return await this.repository.readById(id);
    }

    async updateById(id, data) {
        if (!id) {
            throw new Error('Id is required');
        }
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Invalid data: must be a non-array object');
        }
        return await this.repository.updateById(id, data);
    }

    async deleteById(id) {
        if (!id) {
            throw new Error('Id is required');
        }
        return await this.repository.deleteById(id);
    }
}

module.exports = GenericService;

