const express = require("express")
const cartsRouter = require ("./api/carts.routers");
const productsRouter = require ("./api/products.routers");
const usersRouter = require ("./api/users.routers")

const apiRouter = express.Router();

apiRouter.use("/carts", cartsRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);


module.exports = apiRouter;