const express = require("express");

//Manger
const  {productManager } = require ("../../dao/manager");

//Controlador generico
const GenericController = require ("../../controllers/genericController");
const ProductControllerGeneric = new GenericController(productManager)

//Generador de rutas generico
const generateGenericRouter = require("../../helpers/generateGenericRouter");

//Generamos las rutas mediante el generador 
const productsRouter = generateGenericRouter(ProductControllerGeneric)

module.exports = productsRouter;