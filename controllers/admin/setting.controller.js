const SettingWebsiteInfo = require("../../models/setting-website-info.model")

module.exports.accountAdminCreate = (req,res) =>{
    res.render("admin/pages/setting-account-admin-create",{
        pageTitle:"Tạo tài khoản quản trị"
    })
}
module.exports.accountAdminList = (req,res) =>{
    res.render("admin/pages/setting-account-admin-list",{
        pageTitle:"Tài khoản quản trị"
    })
}
module.exports.list = (req,res) =>{
    res.render("admin/pages/setting-list",{
        pageTitle:"Cài đặt chung"
    })
}
module.exports.roleCreate = (req,res) =>{
    res.render("admin/pages/setting-role-create",{
        pageTitle:"Tạo nhóm quyền"
    })
}
module.exports.roleList = (req,res) =>{
    res.render("admin/pages/setting-role-list",{
        pageTitle:"Nhóm quyền"
    })
}

module.exports.websiteInfo = async (req,res) =>{
     const websiteInfo = await SettingWebsiteInfo.findOne({})
    res.render("admin/pages/setting-website-info",{
        pageTitle:"Thông tin website",
        websiteInfo:websiteInfo
    })
}
module.exports.websiteInfoPatch = async (req,res) =>{
    if(req.files&&req.files.logo){
        req.body.logo = req.files.logo[0].path
    }
    else{
        delete req.body.logo
    }

    if(req.files&&req.files.favicon){
        req.body.favicon = req.files.favicon[0].path
    }
    else{
        delete req.body.favicon
    }
    const websiteInfo = await SettingWebsiteInfo.findOne({})
    if(websiteInfo){
        await SettingWebsiteInfo.updateOne({
            _id:websiteInfo.id
        },
            req.body
        )
    }
    else{
        const dataFinal = new SettingWebsiteInfo(req.body)
        await dataFinal.save()
    }
    req.flash("success","Cập nhật thành công!")
    res.json({
        code:"success"
    })
}