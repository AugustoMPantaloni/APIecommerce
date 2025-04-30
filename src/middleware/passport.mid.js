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
        if(!name || !lastname || !email || !password){
            throw new Error("Data is missing")
        }

        if(!validator.isEmail(email)){
            throw new Error("Invalid email format")
        }

        const validateUser = await userManager.readBy({ email });
        if(validateUser){
            throw new Error("Email already registered")
        }
        
        const passwordHashed = await createHash(password);
        const user = await userManager.createOne({name, lastname, email, password: passwordHashed, role})

        done(null, user)
    }catch (error) {
        done(error)
    }
}
))


