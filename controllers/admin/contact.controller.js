const Contact = require("../../models/contact.model")
const moment = require("moment")
module.exports.list = async (req,res)=>{
    const find ={
        deleted:false
    }
    const filterTime ={}
    if(req.query.startdate){
        filterTime.$gte = moment(req.query.startdate).startOf("date").toDate()
    }
    if(req.query.enddate){
        filterTime.$lte = moment(req.query.enddate).endOf("date").toDate()
    }
    if(Object.keys(filterTime).length > 0){
        find.createdAt = filterTime
    }

    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword.trim(),"i")
        find.email = regex
    }
    const limit = 3
    let page =1 
    const totalContact = await Contact.countDocuments({
        deleted:false
    })
    const totalPage = Math.ceil(totalContact/limit)
    if(req.query.page>0){
        page = req.query.page
    }
    const skip = (page-1)*limit
    const pagination ={
        skip:skip,
        totalContact:totalContact,
        totalPage:totalPage
    }
    const contactList = await Contact
    .find(find)
    .limit(limit)
    .skip(skip)
    contactList.forEach(item => {
        item.formatTime = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
    });

    res.render("admin/pages/contact-list",{
        pageTitle:"Thông tin liên hệ",
        contactList:contactList,
        pagination:pagination
    })
}

module.exports.changPatch = async(req,res)=>{
    try {
        console.log(1)
        await Contact.updateMany({
            _id:{$in:req.body.ids}
        },{
            deleted:true
        })
        console.log(2)
        req.flash("success","Xóa thông tin thành công!")
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