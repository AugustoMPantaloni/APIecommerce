const express = require("express")
const apiRouter = express.Router();

//Rutas genericas
const cartsRouter = require ("./api/carts/carts.routers");
const productsRouter = require ("./api/products/products.routers");
const usersRouter = require ("./api/users/users.routers");

apiRouter.use("/carts", cartsRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);

//Rutas personalizadas
const personalizedCartRouter = require ("./api/carts/personalizedCart.router")
const authRouter = require ("./api/auth/auth.router");

apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", personalizedCartRouter)

module.exports = apiRouter;