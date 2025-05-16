const express = require("express")

const {cartsRouter, cartsActionsRouter} = require ("./api/carts.routers");

const productsRouter = require ("./api/products.routers");
const usersRouter = require ("./api/users.routers");
const authRouter = require ("./api/auth.router");

const apiRouter = express.Router();

//Rutas genericas
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);

//Rutas personalizadas
apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", cartsActionsRouter)

module.exports = apiRouter;