const {Router} = require ("express")


function generateGenericRouter(controller){
    const router = Router()

    router.post("/", controller.createOne);
    router.get("/", controller.readAll);
    router.get("/search", controller.readBy);
    router.get("/:id", controller.readById);
    router.put("/:id", controller.updateById);
    router.delete("/:id", controller.deleteById);

    return router;
}

module.exports = generateGenericRouter