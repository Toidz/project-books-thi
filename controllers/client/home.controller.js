const categoryHelper = require("../../helpers/category.helper")
const Book = require("../../models/book.model")
const { create } = require("../../models/category.model.js")
const New = require("../../models/new.model.js")
const moment = require("moment")
module.exports.home = async (req,res) => {
  const idVn = "6825e6759800453576be8447"
  const arrayVn = await categoryHelper.categoryChild(idVn)
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

  const newList = await New.find({
    deleted:false
  })
  .limit(5)
  .sort({
    position:"desc"
  })
  newList.forEach(item => {
    item.createdAtFormat = moment(item.createdAt).format("DD/MM/YYYY")
  });
  res.render("client/pages/home",{
    pageTitle:"Trang chủ",
    bookVn:bookVn,
    bookNn:bookNn,
    newList:newList
  });
}