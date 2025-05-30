const {userDao} = require ("../factory/factory")

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

        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email,
            password,
            role: req.body.role
        }

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
        passReqToCallback: true,
    },
    async (req, email, password, done) =>{
        try {

            const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email,
            password,
            role: req.body.role
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
        
        const user = await userDao.readBy({email});
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

        const user = await userDao.readBy({email});
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





