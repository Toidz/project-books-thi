const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        user_id:String,
        name:String,
        phone:String,
        city:String,
        district:String,
        ward:String,
        street:String,
        deleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps : true
    }
);
const AddressClient = mongoose.model("AddressClient",schema,"address-client");
module.exports = AddressClient;