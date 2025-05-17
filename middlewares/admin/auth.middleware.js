const jwt = require('jsonwebtoken');
const AccountAdmin = require('../../models/account-admin.model');
const SettingWebsiteInfo = require("../../models/setting-website-info.model")
const Role = require("../../models/roles.model")
module.exports.verifyToken = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            res.redirect(`/${pathAdmin}/account/login`);
            return;
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {email} = decoded;
        const existAccount = await AccountAdmin.findOne({
            email:email,
            status:"active"
        })
        if(!existAccount){
            res.clearCookie("token");
            res.redirect(`/${pathAdmin}/account/login`);
            return;
        }
        req.account = existAccount;
        res.locals.account = existAccount;
        const role = await Role.findOne({
            _id:existAccount.role
        })
        res.locals.role = role
        res.locals.permissions = role.permissions

        const websiteInfo = await SettingWebsiteInfo.findOne({})
        res.locals.websiteInfo = websiteInfo;
        
        next();

    } catch (error) {
        res.clearCookie("token");
        res.redirect(`/${pathAdmin}/account/login`);
    }
}