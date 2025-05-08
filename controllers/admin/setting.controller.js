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
module.exports.websiteInfo = (req,res) =>{
    res.render("admin/pages/setting-website-info",{
        pageTitle:"Thông tin website"
    })
}