const express = require("express");
const passport = require("passport");

//Manger
const  {productManager } = require ("../../dao/manager");

//Controlador generico
const GenericController = require ("../../controllers/genericController");
const ProductControllerGeneric = new GenericController(productManager)

//Generador de rutas generico
const generateGenericRouter = require("../../helpers/generateGenericRouter");

//Generamos las rutas mediante el generador 
const productsRouter = generateGenericRouter(
    ProductControllerGeneric,
    (req, res, next) =>{
        passport.authenticate("admin", {session:false}, (err, user, info)=>{ //Aplicamos el middleware de autorizacion 
            if(err){
                return next(err)
            }
            if(!user){
                return next(new Error(info.message))
            }
            req.user = user
            next()
        }) (req, res, next) 
    }
)

module.exports = productsRouter;