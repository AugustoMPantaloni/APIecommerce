//Middleware Passport para la autenticacion 
const passport = require ("passport")
//Helper para respuestas estandar
const sendSuccess = require ("../helpers/responseHelper.js")


class AuthController {
    constructor(authService){
        this.authService = authService

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.currentUser = this.currentUser.bind(this);
    }

    async registerUser (req, res, next)  {
        const existingToken = req.signedCookies.token
        if(existingToken){
            throw new Error("An active session already exists")
        }
        passport.authenticate("localRegister", {session: false}, async (err, user, info)=>{
            try {
                if(err){
                return next(err);
                }

                if(!user){
                return next(new Error(info.message))
                }

                const {newUser, token} = await this.authService.registerUser(user)

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
            } catch (error) {
                next(error)
            }
        }) (req, res, next)
    }

    async loginUser (req, res, next){
        const existingToken = req.signedCookies.token
        if(existingToken){
            throw new Error("An active session already exists")
        }
        passport.authenticate("localLogin", {session: false}, async (err, user, info)=>{
                try {
                if(err){
                    return next(err)
                }
                if(!user){
                    return next(new Error(info.message))
                }

                const {validateUser, token} = await this.authService.loginUser(user)

                res.cookie("token", token,
                {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    signed: true,
                    secure: true
                })

                sendSuccess(res, {
                    message:"Session started",
                    id: validateUser._id,
                    email: validateUser.email,
                    role: validateUser.role,
                },
                    200);
            } catch (error) {
                next(error)
            }
    }) (req, res, next)
    }

    async currentUser (req, res, next){
        try{
            const token = req.signedCookies.token

            const dataToken = await this.authService.currentUser(token)

            sendSuccess(res,{
                message: "Active session",
                id: dataToken.id,
                email: dataToken.email,
                role: dataToken.role,
            }, 200)
        } catch(error){
            next(error)
        }
    }

    async logoutUser (req, res, next){
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
    }

}




module.exports = AuthController