const {userManager} = require ("../manager/manager")

const {createHash, compareHash} = require ("../helpers/hash.helper")

const validator = require ("validator");

// Passport y estrategias
const passport = require ("passport")
const localStrategy = require ("passport-local").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const JwtStrategy = require ("passport-jwt").Strategy;


// Estrategia de registro local 
passport.use("localRegister", new localStrategy(
    {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
    },

    async (req, email, password, done) => {
    try {
        const {name, lastname, role} = req.body

        //Validamos campos obligatorios
        if(!name || !lastname || !email || !password){
            return done(null, false,{message: "Data is missing"})
        }  

        //Validamos el formato del email
        if(!validator.isEmail(email)){
            return done(null, false,{message: "Invalid email format"})
        }

        //Verificamos si el usuario ya existe
        const validateUser = await userManager.readBy({ email });
        if(validateUser){
            return done(null, false,{message: "Email already registered"})
        }
        
        //Hasheamos la contraseña
        const passwordHashed = await createHash(password);

        //Creamos el usuario
        const user = await userManager.createOne({name, lastname, email, password: passwordHashed, role: role || "user"})

        done(null, user)
    }catch (error) {
        done(error)
    }
}
))

// Estrategia de login local 
passport.use("localLogin", new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) =>{
        try {
            //Buscamos el usuario en la DB
            const user = await userManager.readBy({email});
            if(!user){
                return done(null, false,{message: "Incorrect email or password."})
            }

            //verificamos contraseña
            const match = await compareHash(password, user.password);
            if(!match){
                return done(null, false,{message: "Incorrect email or password."})
            }
            
            done(null, user);
        } catch (error) {
            done(error)
        }
    }
))


// Configuración común para estrategias JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        req => req?.signedCookies?.token
    ]),
    secretOrKey: process.env.PASSWORD_JWT
}
// Estrategia para rutas protegidas solo para administradores
passport.use("admin", new JwtStrategy(opts, async (jwt_payload, done) =>{
    try {
        const {email} = jwt_payload;

        const user = await userManager.readBy({email});
        if(!user){
            return done(null, false,{message: "The user is not registered"})
        }

        if(user.role === "admin"){
            return done(null, user)
        } else{
            return done(null, false, {message: "You are not authorized as admin"})
        }
    } catch (error) {
        return done(error)
    }
})) 

// Estrategia para rutas protegidas solo para usuarios comunes y administradores
passport.use("user", new JwtStrategy(opts, async (jwt_payload, done) =>{
    try {
        const {email} = jwt_payload;

        const user = await userManager.readBy({email});
        if(!user){
            return done(null, false, {message: "The user is not registered"})
        }

        if(user.role === "user" || user.role === "admin"){
            return done(null, user)
        } else{
            return done(null, false, {message: "You do not have the required permissions"})
        }
    } catch (error) {
        return done(error)
    }
})) 





