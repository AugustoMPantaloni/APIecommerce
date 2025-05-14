const {Router} = require ("express")

const sendSuccess = require ("../../helpers/responseHelper");
const passport = require("passport");
const {createToken, validateToken} = require ("../../helpers/jwt.helper")

const {cartManager, userManager} = require("../../dao/manager");




const authRouter = Router();

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

                    const newCart = await cartManager.createOne();

                    await userManager.updateById(user._id, {cart: newCart._id});

                    const tokenData ={
                        id: user._id,
                        email: user.email,
                        role: user.role
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
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        role: user.role
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

