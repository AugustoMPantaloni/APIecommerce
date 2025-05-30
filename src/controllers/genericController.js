/**
* GenericController

* Controlador genérico para manejar operaciones CRUD estándar sobre cualquier recurso,
* delegando la lógica al `service` inyectado (una instancia de GenericService).
*
* Métodos disponibles:
* - createOne(req, res, next)    → Crea un nuevo documento usando los datos del body.
* - readAll(req, res, next)      → Obtiene todos los documentos que coincidan con los filtros del query.
* - readBy(req, res, next)       → Obtiene un único documento según los filtros del query.
* - readById(req, res, next)     → Obtiene un documento por su ID.
* - updateById(req, res, next)   → Actualiza un documento por ID con los datos del body.
* - deleteById(req, res, next)   → Elimina un documento por su ID.
*
* Manejo de errores:
* - Cada método está envuelto en un bloque try/catch.
* - En caso de error, se delega al middleware de errores mediante `next(error)`.
*
* Respuestas:
* - En caso de éxito, se usa el helper `sendSuccess(res, result, statusCode)` para enviar la respuesta.
*
* Ventajas:
* - Alta reutilización para cualquier entidad (productos, usuarios, carritos, etc.).
* - Facilita la escritura de nuevos controladores sin repetir lógica.
* - Se integra naturalmente con un `GenericService` y un `DaoDb`.
*
* Ideal para arquitecturas desacopladas y mantenibles.
*/


const sendSuccess = require("../helpers/responseHelper")

class GenericController {
    constructor (service){
        this.service = service

        this.createOne = this.createOne.bind(this);
        this.readAll = this.readAll.bind(this)
        this.readBy = this.readBy.bind(this)
        this.readById = this.readById.bind(this)
        this.updateById = this.updateById.bind(this)
        this.deleteById = this.deleteById.bind(this)
    }

    async createOne (req, res, next) {
        try {
            const data = req.body;
            const result = await this.service.createOne(data)
            sendSuccess(res, result, 201)
        } catch (error){
            next(error)
        }
    }
    async readAll (req, res, next){
        try {
            const filter = req.query
            const result = await this.service.readAll(filter)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async readBy(req, res, next) {
        try {
            const filter = req.query
            const result = await this.service.readBy(filter)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async readById(req, res, next) {
        try {
            const {id} = req.params 
            const result = await this.service.readById(id)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async updateById(req, res, next){
        try {
            const {id} = req.params 
            const data = req.body
            const result = await this.service.updateById(id, data)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async deleteById(req, res ,next){
        try {
            const {id} = req.params
            const result = await this.service.deleteById(id)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenericController;
