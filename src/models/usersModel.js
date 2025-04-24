const mongoose = require ("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 characters long"], 
        },
        role:{
            type: String,
            enum:["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: true
    }
)

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;