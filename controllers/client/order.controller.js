// const Order = require("../../models/order.model")
// const Tour = require("../../models/tour.model")
// const City = require("../../models/city.model")
// const moment = require("moment")
// const slugify = require("slugify")
// const variable = require("../../config/variable")
// const generateHelper = require("../../helpers/generate.helper")
module.exports.create = async (req,res)=>{
    // try {
    //     const orderCode = "OD" + generateHelper.generateRandomNumber(8)
    //     for (const item of req.body.cart) {
    //         const tour = await Tour.findOne({
    //             _id:item.id,
    //             deleted:false,
    //             status:"active"
    //         })
    //         if(tour){
    //             item.name = tour.name
    //             item.avatar = tour.avatar
    //             item.departureDate = tour.departureDate
    //             item.priceNewAdult = tour.priceNewAdult
    //             item.priceNewChildren = tour.priceChildren
    //             item.priceNewBaby = tour.priceNewBaby
    //             if(item.stockAdult>tour.stockAdult 
    //                 || item.stockChildren >tour.stockChildren
    //                 || item.stockBaby > tour.stockBaby
    //             ){
    //                 res.json({
    //                     code:"error",
    //                     message:"Số lượng chỗ đã vượt quá số lượng còn lại!"
    //                 })
    //                 return
    //             }
                
    //             await Tour.updateOne({
    //                 _id: item.id
    //             },{
    //                 stockAdult : tour.stockAdult - item.stockAdult,
    //                 stockChildren : tour.stockChildren - item.stockChildren,
    //                 stockBaby : tour.stockBaby - item.stockBaby
    //             })
    //         }
    //     }
    //     req.body.priceTotal = req.body.cart.reduce((sum,item)=>{
    //         return sum + item.stockAdult *  item.priceNewAdult 
    //             + item.stockChildren *  item.priceNewChildren 
    //             + item.stockBaby *  item.priceNewBaby 
    //     },0)
    //     req.body.coupon = 0
    //     req.body.pricePay = req.body.priceTotal - req.body.coupon
        
    //     req.body.payStatus = "unpaid"
    //     req.body.status = "initial"
    //     req.body.orderCode = orderCode
    //     const dataFinal = new Order(req.body)
    //     await dataFinal.save()
    //     req.flash("success","Đặt tour thành công!")
    //     res.json({
    //         code:"success",
    //         orderId: dataFinal.id
    //     })
        
    // } catch (error) {
    //     res.json({
    //         code:"error",
    //         message:"Đặt tour thất bại!"
    //     })
    // }
}

module.exports.success = async (req,res)=>{
    // const orderId = req.query.orderId
    // const phone = req.query.phone
    // const order = await Order.findOne({
    //     _id:orderId,
    //     phone:phone
    // })
    // const method = variable.method.find(item => item.value== order.method)
    // order.methodName = method.lable

    // const payStatus = variable.payStatus.find(item => item.value== order.payStatus)
    // order.payStatusName = payStatus.lable

    // const status = variable.status.find(item => item.value== order.status)
    // order.statusName = status.lable

    // order.createdAtFormat = moment(order.createdAt).format("HH:MM - DD/MM/YYYY")
    // for (const item of order.cart) {
    //     item.slug = slugify(item.name)
    //     item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY")
    //     const locationName = await City.findOne({
    //         _id: item.location
    //     })
    //     item.locationName = locationName
    // }
    // console.log(order)
    res.render("client/pages/order-success",{
        pageTitle:"Thông tin đơn hàng",

    })
}