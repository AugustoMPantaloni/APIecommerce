//Dependencias
require ("dotenv").config();
const express = require("express");
const {engine} = require ("express-handlebars");
const morgan = require("morgan");
const cookieParser = require ("cookie-parser");
const passport = require("passport");
require("./middleware/passport.mid")
const path = require("path");

//Server Settings
const server = express();
const PORT = (process.env.PORT);
server.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
});

//DataBase Setting
const connectDB = require ("./config/db");
connectDB();

//Engine Settings
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));

//Middleware Settings
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname,"..","public")));
server.use(morgan("dev"));
server.use(cookieParser(process.env.PASSWORD_COOKIE));
server.use(passport.initialize())

//Router Settings
const router = require("./routers/index.router");
server.use("/", router)

//Error middleware
const pathHandler = require("./middleware/pathHandler.mid");
const errorHandler = require("./middleware/errorHandler.mid");
server.use(pathHandler); 
server.use(errorHandler)





