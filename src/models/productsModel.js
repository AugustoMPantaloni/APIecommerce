const mongoose = require ("mongoose");
const mongoosePaginate = require ("mongoose-paginate-v2")

const ProductsSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
            trim: true
        },
        description:{
            type: String,
            required: true,
            minlength: 10,
            maxlength: 1000,
            trim: true
        },
        code:{
            type: String,
            required: true,
            unique: true,
            match: /^[A-Za-z0-9_-]+$/,
            minlength: 3,
            maxlength: 20
        },
        price:{
            type: Number,
            required: true,
            min: 1
        },
        stock:{
            type: Number,
            required: true,
            min:0
        },
        status:{
            type: Boolean,
            required: true,
            default: true
        },
        category:{
            type: String,
            required: true
        },
        thumbnails:{
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
)
ProductsSchema.plugin(mongoosePaginate)
const ProductModel = mongoose.model("Products", ProductsSchema)

module.exports = ProductModel;