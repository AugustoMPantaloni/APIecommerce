const express = require("express");
const apiRouter = require("./api.router");
const viewsRouter = require("./views.router")

const router = express.Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);


module.exports = router