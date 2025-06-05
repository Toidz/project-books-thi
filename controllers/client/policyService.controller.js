module.exports.policy = (req,res)=>{
    res.render("client/pages/policy",{
        pageTitle:"Trang chính sách & bảo mật"
    })
}
module.exports.service = (req,res)=>{
    res.render("client/pages/service",{
        pageTitle:"Trang điều khoản & dịch vụ"
    }) 
}