const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
const Tour = require("../../models/tour.model") 
const City = require("../../models/city.model")
const AccountAdmin = require("../../models/account-admin.model")
const moment = require("moment")
const slugify = require("slugify")
module.exports.list = async (req,res) =>{
    const find = {
        deleted:false
    }
    if(req.query.status){
        find.status = req.query.status
    }
    if(req.query.id){
        find.createdBy = req.query.id
    }
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const filterDate ={}
    if(startDate){
        filterDate.$gte = moment(startDate).startOf("date").toDate()
    }
    if(endDate){
        filterDate.$lte = moment(endDate).endOf("date").toDate()
    }
    if(Object.keys(filterDate).length>0){
        find.createdAt = filterDate
    }
    if(req.query.category){
        find.category= req.query.category
    }
    const keyword = req.query.keyword
    if(keyword){
        const slug = slugify(keyword,{
            lower:true
        })
        const regex = new RegExp(slug,"i")
        find.slug= regex
    }
    const limit =3
    const totalTour = await Tour.countDocuments({
        deleted:false
    })
    let page =1
    if(req.query.page>0){
        page = req.query.page
    }  
    const totalPage = Math.ceil(totalTour/limit)
    const skip = limit*(page-1)
    const tourList = await Tour.find(find
    ).sort({
        position:"desc"
    })
    .limit(limit)
    .skip(skip)


    const accountList = await AccountAdmin.find({
        status:"active"
    })
    const categoryList = await Category.find({
        deleted:false
    })
    const categoryTree = categoryHelper.categoryTree(categoryList)
    for (const item of tourList) {
        if(item.createdBy){
            const createdByName = await AccountAdmin.findOne({
                _id: item.createdBy
            })
            item.createdBy = createdByName.fullName
        }
        if(item.updatedBy){
            const updatedByName = await AccountAdmin.findOne({
                _id: item.updatedBy
            })
            item.updatedBy = updatedByName.fullName
        }
        item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
        item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY")
    };
    res.render("admin/pages/tour-list",{
        pageTitle:"Quản lý tour",
        tourList:tourList,
        accountList:accountList,
        categoryList:categoryTree,
        totalTour:totalTour,
        totalPage:totalPage,
        totalTour:totalTour,
        skip:skip
    })
}

module.exports.create = async (req,res) =>{
    const categoryList = await Category.find({
        deleted:false
    })
    const cityList = await City.find({})
    const categoryTree = categoryHelper.categoryTree(categoryList)
    res.render("admin/pages/tour-create",{
        pageTitle:"Tạo tour",
        categoryList: categoryTree,
        cityList : cityList
    })
}

module.exports.createPost = async (req,res) =>{
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }
    else{
        const position = await Tour.countDocuments({})
        req.body.position = position +1
    }
    req.body.avatar =  req.file? req.file.path : " "
    req.body.priceAdult = req.body.priceAdult? parseInt(req.body.priceAdult): 0
    req.body.priceChildren = req.body.priceChildren? parseInt(req.body.priceChildren): 0
    req.body.priceBaby =  req.body.priceBaby? parseInt(req.body.priceBaby):0
    req.body.priceNewAdult = req.body.priceNewAdult? parseInt(req.body.priceNewAdult):0
    req.body.priceNewChildren = req.body.priceNewChildren? parseInt(req.body.priceNewChildren):0
    req.body.priceNewBaby =  req.body.priceNewBaby ? parseInt(req.body.priceNewBaby) :0
    req.body.stockAdult =req.body.stockAdult? parseInt(req.body.stockAdult):0
    req.body.stockChildren =  req.body.stockChildren? parseInt(req.body.stockChildren):0
    req.body.stockBaby =  req.body.stockBaby? parseInt(req.body.stockBaby):0
    req.body.locations = req.body.locations ? JSON.parse(req.body.locations):[]
    req.body.departureDate = req.body.departureDate? new Date(req.body.departureDate):null
    req.body.createdBy = req.account.id
    req.body.updatedBy = req.account.id
    req.body.schedules =  req.body.schedules ? JSON.parse(req.body.schedules) : []
    const dataFinal = new Tour(req.body)
    await dataFinal.save()
    req.flash("success", "Tạo tour thành công!");
    res.json({
        code:"success",
        message:"Tạo tour thành công!"
    })
}

module.exports.changePatch = async (req,res) =>{
    try {
        const {ids,status} = req.body
        switch(status){
            case "active": case "inactive":
                await Tour.updateMany({
                    _id: {$in:ids}
                },{
                    status:status
                })
                req.flash("success", "Đổi trạng thái thành công!");
                break
            case "delete":
                await Tour.updateMany({
                    _id:{$in:ids}
                },{
                    deleted:true,
                    deletedBy:req.account.id,
                    deletedAt:Date.now()
                })
                req.flash("success", "Xóa tour thành công!");
                break
        }
        res.json({
            code:"success"
        })
    } catch (error) {
        res.json({
            code:"error",
            message:"Cập nhật trạng thái tour thất bại!"
        })
    }
}

module.exports.edit = async (req,res) =>{
    try {
        const categoryList = await Category.find({
            deleted:false
        })
        const cityList = await City.find({})
        const id= req.params.id
        const currentTour = await Tour.findOne({
            _id:id,
            deleted:false
        })
        currentTour.departureDateFormat = moment(currentTour.departureDate).format("YYYY-MM-DD")
        const categoryTree = categoryHelper.categoryTree(categoryList)
        res.render("admin/pages/tour-edit",{
            pageTitle:"Chỉnh sửa tour",
            categoryList:categoryTree,
            cityList:cityList,
            currentTour:currentTour
        })
    } catch (error) {
        res.redirect(`/${pathAdmin}/tour/list`)     
    }
}

module.exports.editPatch = async (req,res) =>{
    try {
        const id = req.params.id
        if(req.body.position){
            req.body.position= parseInt(req.body.position)
        }
        else{
            const totalCount= await Tour.countDocuments({})
            req.body.position = totalCount +1
        }
        if(req.file){
            req.body.avatar=req.file.path
        }
        else{
            delete req.body.avatar
        }
        req.body.priceAdult = req.body.priceAdult? parseInt(req.body.priceAdult): 0
        req.body.priceChildren = req.body.priceChildren? parseInt(req.body.priceChildren): 0
        req.body.priceBaby =  req.body.priceBaby? parseInt(req.body.priceBaby):0
        req.body.priceNewAdult = req.body.priceNewAdult? parseInt(req.body.priceNewAdult):0
        req.body.priceNewChildren = req.body.priceNewChildren? parseInt(req.body.priceNewChildren):0
        req.body.priceNewBaby =  req.body.priceNewBaby ? parseInt(req.body.priceNewBaby) :0
        req.body.stockAdult =req.body.stockAdult? parseInt(req.body.stockAdult):0
        req.body.stockChildren =  req.body.stockChildren? parseInt(req.body.stockChildren):0
        req.body.stockBaby =  req.body.stockBaby? parseInt(req.body.stockBaby):0
        req.body.locations = req.body.locations ? JSON.parse(req.body.locations):[]
        req.body.departureDate = req.body.departureDate? new Date(req.body.departureDate):null
        req.body.updatedBy = req.account.id
        req.body.schedules =  req.body.schedules ? JSON.parse(req.body.schedules) : []
        console.log(req.body)
        await Tour.updateOne({
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

module.exports.deletePatch= async(req,res)=>{
    try {
        const id=req.params.id
        await Tour.updateOne({
            _id:id
        },{
            deleted:true,
            deletedAt:Date.now(),
            deletedBy:req.account.id
        })
        req.flash("success","Xóa tour thành công!")
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

module.exports.trash = async (req,res) =>{
    const keyword = req.query.keyword
    const find = {
        deleted:true
    }
    if(keyword){
        const slug = slugify(keyword)
        const regex = new RegExp(slug,"i")
        find.slug= regex
    }
    const limit=3
    let page =1
    const totalTour = await Tour.countDocuments({
        deleted:true
    })
    const totalPage = Math.ceil(totalTour/limit)
    if(req.query.page){
        page = req.query.page
    }
    const skip =limit*(page-1)
    const tourList = await Tour.find(find
    ).sort({
        position: "desc"  
    }).limit(
        limit
    ).skip(
        skip
    )
    if(tourList.length>0){
        for(const item of tourList){
            if(item.createdBy){
                const creater = await AccountAdmin.findOne({
                _id:item.createdBy
                })
                item.createrName = creater.fullName
            }
            if(item.updatedBy){
                const updater = await AccountAdmin.findOne({
                    _id:item.updatedBy
                })
                item.updaterName = updater.fullName
            }
            item.formatCreated = moment(item.createdAt).format("HH:MM - DD/MM/YYYY")
            item.formatUpdated = moment(item.updatedAt).format("HH:MM - DD/MM/YYYY")
        };
       
    }
    res.render("admin/pages/tour-trash",{
        pageTitle:"Thùng rác tour",
        tourList:tourList,
        totalPage:totalPage,
        totalTour:totalTour,
        skip:skip
    })
}

module.exports.trashMulti = async (req,res) =>{
    try {
        switch(req.body.status){
            case "restore":
                await Tour.updateMany({
                    _id:{$in:req.body.ids}
                    },{
                    deleted:false
                    })
                req.flash("success","Khôi phục thành công!")
                break
            case "delete":
                await Tour.deleteMany({
                    _id:{$in:req.body.ids}
                    })
                req.flash("success","Xóa vĩnh viễn thành công!")
                break
        }
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

module.exports.restore = async(req,res)=>{
   try {
    const id = req.params.id
    await Tour.updateOne({
        _id:id
    },{
        deleted:false
    })
    req.flash("success","Khôi phục thành công!")
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

module.exports.destroy = async(req,res)=>{
   try {
    const id = req.params.id
    await Tour.deleteOne({
        _id:id
    })
    req.flash("success","Xóa vĩnh viễn thành công!")
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