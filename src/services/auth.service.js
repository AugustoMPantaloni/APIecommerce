//Helper para hasear y validar contraseñas
const {createHash, compareHash} = require ("../helpers/hash.helper")
//Helper para crear y validar tokens
const {createToken, validateToken} = require ("../helpers/jwt.helper")
//Crypto para generar el token de verficacion
const crypto = require ("crypto");
//Funcion helper para enviar emails
const verifyEmail = require ("../helpers/verifyEmailHelper")
const recoverPasswordEmail = require ("../helpers/resetPasswordHelper.js")


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

        //Creamos el token de verificacion
        const emailVerificationToken = crypto.randomBytes(32).toString("hex");

        //Creamos el usuario
        const newUser = await this.userRepository.createOne({
            name,
            lastname,
            email,
            password: passwordHashed,
            role: role || "user",
            cart: newCart._id, //Asignamos el carrito de compras
            emailVerificationToken: emailVerificationToken //Asignamos el token de verificacion
        })

        //Mandamos el email para verificar la cuenta
        verifyEmail(newUser);

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
        const user = await this.userRepository.readBy({emailVerificationToken: tokenEmail})
        if(!user){
            throw new Error("User not found.")
        }

        const userVerified = await this.userRepository.updateById(user._id, {
            verifiedEmail: true,
            emailVerificationToken: null
        })

        if(!userVerified){
            throw new Error("The account could not be verified")
        }

        return userVerified;
    }

    async recoverPasswordRequest(email){
        if(!email){
            throw new Error("data is missing")
        }

        const user = await this.userRepository.readBy({email});
        if(!user){
            throw new Error("User not found.")
        }

        const tokenPassword = crypto.randomBytes(32).toString("hex");

        const updateUser = await this.userRepository.updateById(user._id, {tokenPassword: tokenPassword})
        
        await recoverPasswordEmail(updateUser)

        return {
            message: "Password recovery email sent"
        }
    }
}

module.exports = AuthService;