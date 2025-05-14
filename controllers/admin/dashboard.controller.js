const AccountAdmin = require("../../models/account-admin.model")
module.exports.dashboard =  async (req,res)=>{
    const id = req.account.id;
    const currentAccount = await AccountAdmin.findOne({
        _id:id,
        status:"active"
    })
    res.render("admin/pages/dashboard",{
        pageTitle:"Trang tổng quan",
        currentAccount:currentAccount
    })
}