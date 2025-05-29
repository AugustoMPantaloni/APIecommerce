const {Router} = require ("express")
const authRouter = Router();

//Dao
const {cartDao, userDao} = require ("../../../factory/factory")
//Helper para respuestas estandar
const sendSuccess = require ("../../../helpers/responseHelper");
//Helper para crear y validar tokens
const {createToken, validateToken} = require ("../../../helpers/jwt.helper")
//Middleware Passport para la creacion y login de usuarios
const passport = require("passport");
//Servicios de auth
const AuthService = require ("../../../services/auth.service")
const authService  = new AuthService (cartDao, userDao)


//Registrar usuario
authRouter.post(
        "/register", (req, res, next) => {
            passport.authenticate("localRegister", {session: false}, async (err, user, info) => {
                    if(err){
                        return next(err);
                    }
                    if(!user){
                        return next(new Error(info.message))
                    }

                    //Logica para crear un carrito derivada al servicio de auth
                    const newUser = await authService.registerUser(user);

                    const tokenData ={
                        id: newUser._id,
                        email: newUser.email,
                        role: newUser.role
                    }
                    const token = createToken(tokenData);

                    res.cookie("token", token,{
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        signed: true,
                        secure: true 
                    })
                    sendSuccess(res, {
                        message:"registered user",
                        name: newUser.name,
                        lastname: newUser.lastname,
                        email: newUser.email,
                        role: newUser.role
                    }, 201)
            }) (req, res, next)
});

//logear usurio
authRouter.post(
    "/login", (req, res, next) => {
        passport.authenticate("localLogin", {session: false} ,(err, user, info) => {
                if(err){
                    return next(err)
                }
                if(!user){
                    return next(new Error(info.message))
                }

                const tokenData ={
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
                const token = createToken(tokenData)

                res.cookie("token", token,
                {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    signed: true,
                    secure: true
                })
                sendSuccess(res, {
                    message:"Session started",
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
                    200);
        }) (req, res, next)
})

//Verifica usuario activo
authRouter.get("/current", async (req, res, next) => {
    try {
        
        //Verificamos si existe un token dentro de las cookies
        const token = req.signedCookies.token
        if(!token){
            throw new Error("There is no active session");
        }

        //Validamos el token
        const dataToken = validateToken(token);

        sendSuccess(res,{
            message: "Active session",
            id: dataToken.id,
            email: dataToken.email,
            role: dataToken.role,
        }, 200)
    } catch (error) {
        next(error)
    }
})

//deslogear usuario
authRouter.post("/logout", (req, res, next) => {
    try {
        const user = req.signedCookies.token;
        if(!user){
            throw new Error("There is no active session")
        }

        res.clearCookie("token");

        sendSuccess(res,{
            message: "logout successful"
        } ,200 )
        
    } catch (error) {
        next(error)
    }
})


module.exports= authRouter;

