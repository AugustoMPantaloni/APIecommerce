const passport = require ("passport")
const localStrategy = require ("passport-local").Strategy;
const {createHash, compareHash} = require ("../helpers/hash.helper")
const {userManager} = require ("../dao/manager")
const validator = require ("validator")


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


passport.use("localLogin", new localStrategy (
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


