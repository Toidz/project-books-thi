const mongoose = require("mongoose")
const schema = new mongoose.Schema(
    {
        email:String,
        deleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)
const Contact = mongoose.model("Contact",schema,"contacts")
module.exports= Contact