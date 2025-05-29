/*
Factory de DAOs: patrón que selecciona e instancia el conjunto adecuado de DAOs según la 
configuración de la variable de enterono PERSISTENCE. Permite cambiar el motor de persistencia
(MongoDB, archivos, memoria, {estas ultimas dos no implementadas}) sin tocar los controladores o rutas.
Aísla la decisión de implementación y garantiza consistencia en la interfaz de los DAOs.
*/

const mongoDao = require("../dao/dao.DB");
const fsDao = require("../dao/dao.FS");
const memoryDao = require("../dao/dao.MEMORY");

const {PERSISTENCE} = process.env

let productDao, cartDao, userDao;

switch (PERSISTENCE) {
    case "mongo":
        productDao = mongoDao.productDaoDb;
        cartDao = mongoDao.cartDaoDb;
        userDao = mongoDao.userDaoDb;
        const connectDB = require ("../config/db");
        connectDB();
        break;

    case "fs":
        productDao = fsDao.productDaoFs;
        cartDao = fsDao.cartDaoFs;
        userDao = fsDao.userDaoFs;
        console.log("Fs Connected")
        console.log("Unimplemented functions")
        break;

    case "memory":
        productDao = memoryDao.productDaoMemory;
        cartDao = memoryDao.cartDaoMemory;
        userDao = memoryDao.userDaoMemory;
        console.log("Memory Connected")
        console.log("Unimplemented functions")
        break;

    default:
        throw new Error("Persistencia no soportada");
    }

module.exports = {
    productDao,
    cartDao,
    userDao
};