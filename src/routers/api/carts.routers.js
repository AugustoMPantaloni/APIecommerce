const express = require("express")

//manager 
const {cartManager} = require("../../dao/manager")

//Controlador generico
const GenericController =  require("../../controllers/genericController");
const cartControllerGeneric = new GenericController(cartManager);

//Generador de rutas generico
const generateGenericRouter = require ("../../helpers/generateGenericRouter")

//Generamos las rutas mediante el generador
const cartsRouter = generateGenericRouter(cartControllerGeneric)

module.exports = cartsRouter