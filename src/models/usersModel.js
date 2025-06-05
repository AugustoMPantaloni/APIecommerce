const mongoose = require ("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        lastname:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
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
        },
        cart:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Carts",
        },
        emailVerificationToken:{
            type: String,
        },
        verifiedEmail:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;