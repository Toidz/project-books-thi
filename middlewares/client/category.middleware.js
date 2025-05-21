const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
module.exports.category = async (req,res,next)=>{
    const category = await Category.find({
      deleted:false  
    })

    const categoryTree =  categoryHelper.categoryTree(category)
    res.locals.categoryList = categoryTree
    next()
}