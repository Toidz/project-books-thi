const categoryHelper = require("../../helpers/category.helper")
const Book = require("../../models/book.model")
module.exports.home = async (req,res) => {
  const idVn = "6825e6759800453576be8447"
  const arrayVn = await categoryHelper.categoryChild(idVn)
  console.log(arrayVn)
  const bookVn = await Book.find({
    category: {$in:arrayVn},
    deleted:false
  })
  .limit(4)
  .sort({
    position:"desc"
  })

  const idNn = "6825e6ad9800453576be8465"
  const arrayNn = await categoryHelper.categoryChild(idNn)
  const bookNn = await Book.find({
    category: {$in:arrayNn},
    deleted:false
  })
  .limit(4)
  .sort({
    position:"desc"
  })

  res.render("client/pages/home",{
    pageTitle:"Trang chủ",
    bookVn:bookVn,
    bookNn:bookNn
  });
}