//Helper para hasear y validar contraseñas
const {createHash, compareHash} = require ("../helpers/hash.helper")
//Helper para crear y validar tokens
const {createToken, validateToken} = require ("../helpers/jwt.helper")

const validator = require ("validator");

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

        //Creamos el usuario
        const newUser = await this.userRepository.createOne({
            name,
            lastname,
            email,
            password: passwordHashed,
            role: role || "user",
            cart: newCart._id //Aca le asignamos el carrito de compras
        })

        const tokenData = {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
        }

        const token = createToken(tokenData)

        return{newUser: newUser, token: token}
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

}

module.exports = AuthService;