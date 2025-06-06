//Helper para hasear y validar contraseñas
const {createHash, compareHash} = require ("../helpers/hash.helper")
//Helper para crear y validar tokens
const {createToken, validateToken} = require ("../helpers/jwt.helper")
//Crypto para generar token
const crypto = require ("crypto");
//Funcion helper para enviar emails
const verifyEmail = require ("../helpers/verifyEmailHelper")
const recoverPasswordEmail = require ("../helpers/resetPasswordHelper.js")
//Libreria para validar datos
const validator = require ("validator");

const { token } = require("morgan");

class AuthService {
    constructor (cartRepository, userRepository){
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    async registerUser (user){
        //Desestructuramos el user que viene como un objeto para obtener los datos
        const {name, lastname, email, password, role} = user

        //Validamos campos obligatorios
        if(!name || !lastname || !email || !password){
            throw new Error("Data is missing");
        }

        //Validamos el formato del email
        if(!validator.isEmail(email)){
            throw new Error("Invalid email format");
        }

        //Verificamos si el usuario ya existe
        const validateUser = await this.userRepository.readBy({ email });
        if(validateUser){
            throw new Error("Email already registered");
        }

        //Hasheamos la contraseña
        const passwordHashed = await createHash(password);

        //Creamos un carrito de compras 
        const newCart = await this.cartRepository.createOne();

        //Creamos el token de email
        const tokenEmail = crypto.randomBytes(32).toString("hex");
        //Hasheamos el token con crypto para no exponerlo en la DB
        const hashedTokenEmail = crypto.createHash("sha256").update(tokenEmail).digest("hex")

        //Creamos el usuario
        const newUser = await this.userRepository.createOne({
            name,
            lastname,
            email,
            password: passwordHashed,
            role: role || "user",
            cart: newCart._id, //Asignamos el carrito de compras
            tokenEmail: hashedTokenEmail, //Asignamos el token de verificacion
        })

        //Mandamos el email para verificar la cuenta
        verifyEmail(newUser, tokenEmail);

        return{newUser: newUser}
    }

    async loginUser (user){
        const {name, lastname, email, password} = user

        const validateUser = await this.userRepository.readBy({email})
        if(!validateUser){
            throw new Error("Incorrect email or password.")
        }

        const match = await compareHash(password, validateUser.password)
        if(!match){
            throw new Error("Incorrect email or password.")
        }

        if(!validateUser.verifiedEmail){
            throw new Error("This account is not verified")
        }

        const tokenData ={
        id: validateUser._id,
        email: validateUser.email,
        role: validateUser.role
        }
        const token = createToken(tokenData)

        return {validateUser: validateUser, token: token}
    }

    async currentUser (token){
        if(!token){
        throw new Error("There is no active session");
        }
        //Validamos el token
        const dataToken = validateToken(token);

        return dataToken;
    }

    async logoutUser (){
        //Sin logica existente
    }

    async verifyUser(tokenEmail){
        //Hasheamos el token para podes buscarlo en la base de datos
        const hashedToken = crypto.createHash("sha256").update(tokenEmail).digest("hex");

        const user = await this.userRepository.readBy({tokenEmail: hashedToken})
        if(!user){
            throw new Error("User not found.")
        }

        const userVerified = await this.userRepository.updateById(user._id, {
            verifiedEmail: true,
            tokenEmail: null
        })

        if(!userVerified){
            throw new Error("The account could not be verified")
        }

        return userVerified;
    }
    //Servicio que envia email para resetear la constraseña 
    async recoverPasswordRequest(email){
        if(!email){
            throw new Error("data is missing")
        }

        const user = await this.userRepository.readBy({email});
        if(!user){
            throw new Error("User not found.")
        }

        //Creamos el token de contraseña
        const tokenPassword = crypto.randomBytes(32).toString("hex");
        //Hasheamos el token con crypto para no exponerlo en la DB
        const hashedTokenPassword = crypto.createHash("sha256").update(tokenPassword).digest("hex")
        const expires = new Date(Date.now() + 15 * 60 * 1000)

        const updateUser = await this.userRepository.updateById(
            user._id,{
            tokenPassword: hashedTokenPassword,
            tokenPasswordExpires: expires
        })
        
        await recoverPasswordEmail(updateUser, tokenPassword)

        return {
            message: "Password recovery email sent"
        }
    }
    //Servicio que actualiza la contrasñea gracias al email 
    async resetPassword(tokenPassword, newPassword){
        //Hasheamos el token para podes buscarlo en la base de datos
        const hashedToken = crypto.createHash("sha256").update(tokenPassword).digest("hex");

        const user = await this.userRepository.readBy({tokenPassword: hashedToken,})
        
        if(!user){
            throw new Error("User not found")
        }

        if(user.tokenPasswordExpires < Date.now()){
            throw new Error("The link has expired. Please try again to recover your password.")
        }
        const isSamePassword = await compareHash(newPassword, user.password);
        if(isSamePassword){
            throw new Error("The new password cannot be the same as the previous one.")
        }

        const passwordHashed = await createHash(newPassword)

        const updateUser = await this.userRepository.updateById(user._id, {
            password: passwordHashed,
            tokenPassword: null,
            tokenPasswordExpires: null
        });
        if(!updateUser){
            throw new Error("The password could not be updated.")
        }

        return {
            message: "Password updated"
        }
    }
}

module.exports = AuthService;