function sendSuccess(res, data, code=200){
    return res.status(code).json({
        status: "Success",
        method: res.req.method,
        url: res.req.originalUrl,
        data,
    })
}

module.exports = sendSuccess;