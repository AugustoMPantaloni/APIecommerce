//Funcion para hashear contraseña

const bcrypt = require ("bcrypt");

const createHash = async (password) => {
    const hashedPassword = await bcrypt.hash (password, 10);
    return hashedPassword;
}

//Funcion para comprar una contraseña con su hash
const compareHash = async (password, hashedPassword) =>{
    return  await bcrypt.compare(password, hashedPassword)
}

module.exports= {
    createHash,
    compareHash
}