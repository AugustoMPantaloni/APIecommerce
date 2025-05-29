/* Documentacion *
* GenericController
* 
* Este controlador genérico implementa operaciones CRUD estándar para manejar las peticiones HTTP
* utilizando un `dao` inyectado (una instancia de la clase dao).
* 
* Métodos implementados:
* - createOne(req, res, next): Crea un nuevo documento con los datos del body.
* - readAll(req, res, next): Lee todos los documentos que coincidan con los filtros del query.
* - readBy(req, res, next): Lee el primer documento que coincida con los filtros del query.
* - readById(req, res, next): Busca un documento por su ID.
* - updateById(req, res, next): Actualiza un documento por ID con los datos del body.
* - deleteById(req, res, next): Elimina un documento por su ID.
* 
* Cada método maneja errores con un try/catch y delega al middleware de errores con `next(error)`.
* Las respuestas exitosas se envían con el helper `sendSuccess(res, result, statusCode)`.
* 
* Ideal para usar con cualquier recurso que requiera CRUD.
*/

const sendSuccess = require("../helpers/responseHelper")

class GenericController {
    constructor (dao){
        this.dao = dao

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
            const result = await this.dao.createOne(data)
            sendSuccess(res, result, 201)
        } catch (error){
            next(error)
        }
    }
    async readAll (req, res, next){
        try {
            const filter = req.query
            const result = await this.dao.readAll(filter)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async readBy(req, res, next) {
        try {
            const filter = req.query
            const result = await this.dao.readBy(filter)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async readById(req, res, next) {
        try {
            const {id} = req.params 
            const result = await this.dao.readById(id)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async updateById(req, res, next){
        try {
            const {id} = req.params 
            const data = req.body
            const result = await this.dao.updateById(id, data)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
    async deleteById(req, res ,next){
        try {
            const {id} = req.params
            const result = await this.dao.deleteById(id)
            sendSuccess(res, result, 200)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenericController;
