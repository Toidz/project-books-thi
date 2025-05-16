const Book = require("../../models/book.model");
const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
module.exports.book = async (req, res) => {
  const category = await Category.find({
      deleted:false
  })
  const categoryTree = categoryHelper.categoryTree(category)

  const categoryCurrent = req.params.id
  const dataCategory = await Category.findOne({
    _id:categoryCurrent
  })

  const categoryChildren = await Category.find({
    parent:categoryCurrent
  })

  const ids = []
  categoryChildren.forEach(item => {
    const id =item.id
    ids.push(id)
  });
  const totalBook = await Book.countDocuments({})
  const find ={
    category : ids.length? {$in:ids}: categoryCurrent
  }
  const filterCategory = req.query.category
  const filterPrice = req.query.price
  if(filterPrice&&filterCategory){
    const priceCurrent = {}
    switch(parseInt(filterPrice)){
      case 0:
        priceCurrent.$lte = 50000
        break
      case 50:
        priceCurrent.$gte = 50000
        priceCurrent.$lte = 100000
        break
      case 100:
        priceCurrent.$gte = 100000
        priceCurrent.$lte = 200000
        break
      case 200:
        priceCurrent.$gte = 200000
        break
    }
      console.log(priceCurrent)
    if (Object.keys(priceCurrent).length > 0) {
      find.priceBook = priceCurrent
    } 
    find.category = filterCategory
  }
  const allBook = await Book.find(find)
  console.log(allBook)
  res.render("client/pages/book",{
    pageTitle:"Danh sách sách",
    categoryList:categoryTree,
    dataCategory:dataCategory,
    categoryChildren:categoryChildren,
    totalBook:totalBook,
    allBook:allBook
  });
}

module.exports.detail = async (req,res) =>{
  const category = await Category.find({
      deleted:false
  })
  const categoryTree = categoryHelper.categoryTree(category)

  const id = req.params.id
  const bookCurrent = await Book.findOne({
    _id:id
  })
  const parentId = await Category.findOne({
    _id:bookCurrent.category
  })
  const parent={} 
  parent.id = parentId.id
  parent.name = parentId.name
  parent.parent = parentId.parent
  console.log(parent)

  const parentIds = await Category.findOne({
    _id:parent.parent
  })
  const parents = {}
  parents.id = parentIds.id
  parents.name = parentIds.name
  parents.parent = parentIds.parent

  const parentIdss = await Category.findOne({
    _id:parents.parent
  })
  const parentss = {}
  parentss.id = parentIdss.id
  parentss.name = parentIdss.name
  parentss.parent = parentIdss.parent

  res.render("client/pages/book-detail",{
    pageTitle:"Chi tiết sách",
    categoryList:categoryTree,
    bookCurrent:bookCurrent,
    parent:parent,
    parents:parents,
    parentss:parentss,
  });
}
