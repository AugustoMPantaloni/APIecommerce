const { Router } = require("express");

function generateGenericRouter(controller, authMiddleware = null) {
    const router = Router();

    // Si hay authMiddleware, lo aplicamos en las rutas protegidas
    if (authMiddleware) {
        router.post("/", authMiddleware, controller.createOne);
        router.put("/:id", authMiddleware, controller.updateById);
        router.delete("/:id", authMiddleware, controller.deleteById);
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
