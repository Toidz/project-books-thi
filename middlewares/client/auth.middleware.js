const jwt = require('jsonwebtoken');
const AccountClient = require('../../models/account-client.model');
module.exports.verifyToken = async (req,res,next)=>{
    try {
        const token = req.cookies.tokenUser;
        if(!token){
            res.redirect(`/account/login`);
            return;
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_CLIENT);
        const {email} = decoded;
        const existAccount = await AccountClient.findOne({
            email:email
        })
        if(!existAccount){
            res.clearCookie("token");
            res.redirect(`/account/login`);
            return;
        }
        req.account = existAccount;
        res.locals.account = existAccount;
        next();

    } catch (error) {
        res.clearCookie("token");
        res.redirect(`/account/login`);
    }
}