const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        orderCode:String,
        fullName:String,
        phone:String,
        note:String,
        method:String,
        cart:Array,
        priceTotal:Number,
        coupon:{
            type:Number,
            default:0
        },
        pricePay:Number,
        status:String,
        payStatus:String,
        updatedBy:String,
        deletedBy:String,
        deletedAt:Date,
        deleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps : true
    }
);
const Order = mongoose.model("Order",schema,"orders");
module.exports = Order;
