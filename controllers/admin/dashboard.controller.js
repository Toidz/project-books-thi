module.exports.dashboard =  async (req,res)=>{
    res.render("admin/pages/dashboard",{
        pageTitle:"Trang tổng quan"
    })
}