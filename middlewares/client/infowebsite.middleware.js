const SettingWebsiteInfo = require("../../models/setting-website-info.model")
const jwt = require("jsonwebtoken")
const AccountClient = require("../../models/account-client.model")
const Cart = require("../../models/cart.model")
module.exports.info = async (req,res,next)=>{

    const info = await SettingWebsiteInfo.findOne({})
    res.locals.info = info;

    let id_user = "";
    const token = req.cookies.tokenUser;
    if (token) {
        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
        const existAccount = await AccountClient.findOne({ email: decoded.email });
        if (existAccount) {
            id_user = existAccount.id;
        }
        } catch (error) {
        }
    }
    const listItem = await Cart.find({
        id_user:id_user,
        deleted:false
    })
   
    res.locals.lengthCart = listItem.length;
    next()
}