const AccountAdmin = require("../../models/account-admin.model")
const bcrypt = require("bcryptjs")
module.exports.edit = (req,res)=>{
    res.render("admin/pages/profile-edit",{
        pageTitle:"Thông tin cá nhân"
    })
}
module.exports.editPatch = async (req,res)=>{
   try {
    const id = req.params.id
    if(req.file){
        req.body.avatar = req.file.path
    }else{
        delete req.body.avatar
    }
    await AccountAdmin.updateOne({
        _id:id
    },req.body)
    req.flash("success","Cập nhật tài khoản thành công!")
    res.json({
        code:"success"
    })
    } catch (error) {
    res.json({
        code:"success",
        message:"Cập nhật tài khoản thất bại!"
    })
   }
    
}
module.exports.changePassword = (req,res)=>{
    res.render("admin/pages/profile-change-password",{
        pageTitle:"Đổi mật khẩu"
    })
}
module.exports.changePasswordPatch = async (req,res)=>{
    try {
        const id= req.account.id
        const password = req.body.password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await AccountAdmin.updateOne({
            _id:id
        },{
            password:hash
        })
        req.flash("success","Đổi mật khẩu thành công!")
        res.json({
            code:"success"
        })
    } catch (error) {
        res.json({
            code:"error",
            message:"Đổi mật khẩu thất bại!"
        })
    }
}