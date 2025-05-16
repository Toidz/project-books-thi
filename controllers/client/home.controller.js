const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
const Book = require("../../models/book.model")
module.exports.home = async (req,res) => {
    const category = await Category.find({
      deleted:false
    })
    const allBook = await Book.find({
      deleted:false
    })
    const categoryTree = categoryHelper.categoryTree(category)
    console.log(allBook)
    res.render("client/pages/home",{
      pageTitle:"Trang chủ",
      categoryList:categoryTree,
      allBook:allBook
    });
  }