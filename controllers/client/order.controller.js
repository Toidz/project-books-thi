const Order = require("../../models/order.model")
const Book = require("../../models/book.model")
const moment = require("moment")
const slugify = require("slugify")
const variable = require("../../config/variable")
const CryptoJS = require("crypto-js");
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

module.exports.zalopay = async (req,res)=>{

    try {
        const orderId = req.query.orderId
        const orderDetail = await Order.findOne({
            _id:orderId,
            deleted:false,
            payStatus:"unpaid"
        })
      
        if(!orderDetail){
            console.log(1)
            res.redirect("/")
            return
        }
    // Node v10.15.3
        const axios = require('axios').default; 
        const CryptoJS = require('crypto-js'); 
        const moment = require('moment'); 

        // APP INFO
        const config = {
            app_id: process.env.ZALOPAY_ID,
            key1: process.env.ZALOPAYKEY1,
            key2: process.env.ZALOPAYKEY2,
            endpoint: `${process.env.ZALOPAYDOMAIN}/v2/create`
        };

        const embed_data = {
            redirecturl:`${process.env.DOMAIN_WEBSITE}/order/success?orderId=${orderDetail.id}&phone=${orderDetail.phone}`
        };

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: `${orderDetail.id}-${orderDetail.phone}`,//info
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: orderDetail.priceTotal,//tong tien
            description: `Thanh toán đơn hàng #${orderDetail.orderCode}`,//mota
            bank_code: "",
            callback_url:`${process.env.DOMAIN_WEBSITE}/order/payment-zalopay-result`
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const response =  await axios.post(config.endpoint, null, { params: order })

        console.log(response.data);
        if(response.data.return_code==1){
            res.redirect(response.data.order_url)
        }
        else{
            res.redirect("/")
        }
    } catch (error) {
        res.redirect("/")
    }
}

module.exports.zalopayPost = async (req,res)=>{
    const config = {
    key2:  process.env.ZALOPAYKEY2
    };
    let result = {};

    try {
        console.log(1)
        let dataStr = req.body.data;
        let reqMac = req.body.mac;
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
        }
        else {
        // thanh toán thành công
        let dataJson = JSON.parse(dataStr, config.key2);
        const [orderId,phone] = dataJson.app_user.split("-");
 
        await Order.updateOne({
            _id: orderId,
            phone: phone,
            deleted: false
        },{
            payStatus: "paid"
        })

        result.return_code = 1;
        result.return_message = "success";
        }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
}

