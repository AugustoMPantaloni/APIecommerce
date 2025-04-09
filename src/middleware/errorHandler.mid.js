const errorHandler =(error, req, res, next) =>{
    const data = {
        method: req.method,
        url: req.originalUrl,
        error: error.message || "Server Error"
    }
    console.error(error)
    res.status(error.statusCode || 500).json(data) 
}

module.exports = errorHandler