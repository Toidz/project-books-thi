module.exports.error = (req,res)=>{
    res.render("admin/pages/error-404",{
        pageTitle:"404 Not Found"
    })
}