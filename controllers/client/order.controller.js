const Order = require("../../models/order.model")
const Book = require("../../models/book.model")
const moment = require("moment")
const slugify = require("slugify")
const variable = require("../../config/variable")
const generateHelper = require("../../helpers/generate.helper")
module.exports.create = async (req,res)=>{
    try {
        const orderCode = "OD" + generateHelper.generateRandomNumber(8)
        for (const item of req.body.cart) {
            const book = await Book.findOne({
                _id:item.id,
                deleted:false,
            })
            if(book){
                item.name = book.name
                item.avatar = book.avatar1
                item.priceBook = book.priceBook
                item.slug = book.slug
                if(item.numberBook>book.numberBook){
                    res.json({
                        code:"error",
                        message:"Số lượng sách đã vượt quá số lượng còn lại!"
                    })
                    return
                }
                
                await Book.updateOne({
                    _id: item.id
                },{
                    numberBook : book.numberBook - item.numberBook
                })
            }
        }
        req.body.priceTotal = req.body.cart.reduce((sum,item)=>{
            return sum + item.numberBook *  item.priceBook
        },0)
        req.body.payStatus = "unpaid"
        req.body.status = "initial"
        req.body.orderCode = orderCode
        const dataFinal = new Order(req.body)
        await dataFinal.save()
        req.flash("success","Đặt sách thành công!")
        res.json({
            code:"success",
            orderId: dataFinal.id
        })
        
    } catch (error) {
        res.json({
            code:"error",
            message:"Đặt sách thất bại!"
        })
    }
}

module.exports.success = async (req,res)=>{
    const orderId = req.query.orderId
    const phone = req.query.phone
    const order = await Order.findOne({
        _id:orderId,
        phone:phone,
        deleted:false
    })
    const method = variable.method.find(item => item.value== order.method)
    order.methodName = method.lable

    const payStatus = variable.payStatus.find(item => item.value== order.payStatus)
    order.payStatusName = payStatus.lable

    const status = variable.status.find(item => item.value== order.status)
    order.statusName = status.lable

    order.createdAtFormat = moment(order.createdAt).format("HH:MM - DD/MM/YYYY")

    res.render("client/pages/order-success",{
        pageTitle:"Thông tin đơn hàng",
        order:order
    })
}