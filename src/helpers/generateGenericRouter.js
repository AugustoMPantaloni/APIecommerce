const { Router } = require("express");
const checkTokenExists = require("../middleware/checkTokenExist"); //Midd que verifica si existe un token

function generateGenericRouter(controller, authMiddleware = null) {
    const router = Router();

    // Si hay authMiddleware, lo aplicamos en las rutas protegidas 
    if (authMiddleware) {
        router.post("/", checkTokenExists, authMiddleware, controller.createOne);
        router.put("/:id", checkTokenExists, authMiddleware, controller.updateById);
        router.delete("/:id", checkTokenExists, authMiddleware, controller.deleteById);
    } else {
        router.post("/", controller.createOne);
        router.put("/:id", controller.updateById);
        router.delete("/:id", controller.deleteById);
    }

    // Las rutas públicas (siempre accesibles)
    router.get("/", controller.readAll);
    router.get("/search", controller.readBy);
    router.get("/:id", controller.readById);

    return router;
}

module.exports = generateGenericRouter;
