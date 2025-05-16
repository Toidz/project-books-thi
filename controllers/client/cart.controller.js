const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
module.exports.cart = async (req,res)=>{
    const category = await Category.find({
        deleted:false
    })
    const categoryTree = categoryHelper.categoryTree(category)
    res.render("client/pages/cart",{
        pageTitle:"Trang giỏ hàng",
        categoryList:categoryTree
    });
}
