const SettingWebsiteInfo = require("../../models/setting-website-info.model")
const permissionList = require("../../config/permission")
const Role = require("../../models/roles.model")
const { default: slugify } = require("slugify")
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
module.exports.list = async (req,res) =>{
    res.render("admin/pages/setting-list",{
        pageTitle:"Cài đặt chung"
    })
}

module.exports.roleCreate = (req,res) =>{
    res.render("admin/pages/setting-role-create",{
        pageTitle:"Tạo nhóm quyền",
        permissionList: permissionList.permission
    })
}

module.exports.roleEdit = async (req,res)=>{
    const id = req.params.id
    const currentRole = await Role.findOne({
        _id:id,
        deleted:false
    })
    res.render("admin/pages/setting-role-edit",{
        pageTitle:"Sửa nhóm quyền",
        permissionList: permissionList.permission,
        role:currentRole
    })
}

module.exports.roleEditPatch = async (req,res)=>{
    try {
        const id = req.params.id
        req.body.updatedBy = req.account.id
        await Role.updateOne({
            _id:id,
            deleted:false
        },req.body)
        req.flash("success","Cập nhật thành công!")
        res.json({
            code:"success"
        })
    } catch (error) {
        res.json({
            code:"error",
            message:"Cập nhật thất bại!"
        })
    }
}

module.exports.roleDeletePatch = async (req,res)=>{
    try {
        const id = req.params.id
        req.body.updatedBy = req.account.id
        await Role.updateOne({
            _id:id,
        },{
            deleted:true, 
            deletedAt:Date.now(),
            deletedBy:req.account.id
        })
        req.flash("success","Xóa thành công!")
        res.json({
            code:"success"
        })
    } catch (error) {
        res.json({
            code:"error",
            message:"Xóa thất bại!"
        })
    }
}

module.exports.roleCreatePost = async (req,res) =>{
    req.body.createdBy = req.account.id
    req.body.updatedBy = req.account.id
    const dataFinal = new Role(req.body)
    await dataFinal.save()
    req.flash("success","Tạo mới nhóm quyền thành công!")
    res.json({
        code:"success"
    })
}

module.exports.roleList = async (req,res) =>{
    const keyword = req.query.keyword
    const find ={
        deleted:false
    }
    if(keyword){
        const slug= slugify(keyword.trim())
        const regex = new RegExp(slug,"i")
        find.slug=regex
        console.log(slug)
    }
    const roleList = await Role.find(find)
    res.render("admin/pages/setting-role-list",{
        pageTitle:"Nhóm quyền",
        roleList:roleList
    })
}

module.exports.roleListPatch = async (req,res) =>{
    try {
        const {status,ids} = req.body;
        if(status=="delete"){
            await Role.updateMany({
                _id:{$in:ids},
                deleted:false
            },{
                deleted:true,
                deletedBy:req.account.id,
                deletedAt:Date.now()
            })
        }
        req.flash("success","Xóa nhóm quyền thành công!")
        res.json({
            code:"success"
        })
 
    } catch (error) {
        res.json({
            code:"error",
            message:"Cập nhật thất bại!"
        })
    }
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