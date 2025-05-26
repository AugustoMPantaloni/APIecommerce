//Middleware para dar informacion sobre la ruta a la que se hace la peticion

const pathHandler = (req, res) => {
    const message = "Not Found URL";
    const data = {
        method: req.method,
        url: req.originalUrl,
        error: message
    };
    res.status(404).json(data);
}

module.exports = pathHandler