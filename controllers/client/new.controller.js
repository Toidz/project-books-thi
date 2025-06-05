const New = require("../../models/new.model")
module.exports.item = async (req,res)=>{
    const slug = req.params.slug
    const currentNew = await New.findOne({
        deleted:false,
        slug:slug
    })
    if(currentNew){
        res.render("client/pages/news",{
            pageTitle:"Trang tin tức",
            currentNew:currentNew
        })
    }
    else{
        res.redirect("/")
    }
}