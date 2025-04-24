const express =  require ("express");
const {Router} = require ("express")
const validator = require('validator'); 

//Manager de usuarios
const {userManager} = require ("../../dao/manager")

const sendSuccess = require ("../../helpers/responseHelper");

const authRouter = Router();

//Registrar usuario
authRouter.post("/register", async (req, res, next)=>{
    try {
        const {email, name, lastname, password, role} = req.body
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

        const user = await userManager.createOne({name, lastname, email, password, role})

        sendSuccess(res, {
            message:"User created",
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        }, 201)
    } catch (error) {
        next(error)
    }
})

//logear usurio
authRouter.post("/login", async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await userManager.readBy({email, password});
        if(!user){
            throw new Error("Incorrect email or password.")
        }

        res.cookie("user", {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            signed: true,
            secure: true
        })

        sendSuccess(res, {
            id: user._id,
            email: user.email,
            role: user.role,
        },
            201);
    } catch (error) {
        next(error)
    }
})

//Verifica usuario activo
authRouter.get("/current", async (req, res, next)=>{
    try {
        const current = req.signedCookies.user
        if(!current){
            throw new Error("There is no active session");
        }
        sendSuccess(res,{
            id: current.id,
            email: current.email,
            role: current.role,
        }, 200)
    } catch (error) {
        next(error)
    }
})

//deslogear usuario
authRouter.post("/logout", (req, res, next)=>{
    try {
        const user = req.signedCookies.user;
        if(!user){
            throw new Error("There is no active session")
        }

        res.clearCookie("user");

        sendSuccess(res,{
            message: "logout successful"
        } ,200 )
        
    } catch (error) {
        next(error)
    }
})


module.exports= authRouter;