const express = require("express")

//Manager
const {userManager} = require ("../../dao/manager");

//Controlador generico
const genericController = require ("../../controllers/genericController");
const userControllerGeneric = new genericController(userManager);

//Generador de rutas generico
const generateGenericRouter = require ("../../helpers/generateGenericRouter")

//generamos la ruta mediante el generador
const usersRouter = generateGenericRouter(userControllerGeneric);

module.exports = usersRouter