const jwt = require("jsonwebtoken");


const createToken = (data) => {
    const secret = process.env.PASSWORD_JWT;
    const options = { expiresIn: "7d"}
    try{
        const token = jwt.sign(data, secret, options)
        return token;
    }catch(error){
        const err =  new Error("Error creating token");
        err.statusCode = 500;
        throw err;
    }
}

const validateToken = (token) => {
    const secret = process.env.PASSWORD_JWT;
    try{
        const validate = jwt.verify(token, secret)
        return validate
    } catch(error){
        const err = new Error("Token validation error");
        err.statusCode = 401;
        throw err;
    }
}

module.exports = { createToken, validateToken };