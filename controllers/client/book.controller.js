const Book = require("../../models/book.model");
const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
module.exports.book = async (req, res) => {
  const slugCurrent = req.params.slug
  const dataCategory = await Category.findOne({
    slug:slugCurrent
  })
  let breadList = []
  if(dataCategory.parent){
    const bread = await categoryHelper.categoryParent(dataCategory.parent)
    if(bread.length >0){
      breadList = await Category.find({
      _id:{$in:bread}
    })
    }
  }
  const arrayId = await categoryHelper.categoryChild(dataCategory.id)
  const find ={
    category : {$in:arrayId}
  }
  
  const filterChild = await Category.find({
    _id:{$in:arrayId}
  })
  const filterChildTree = categoryHelper.categoryTree(filterChild,dataCategory.parent)
  const totalBook = await Book.countDocuments({
    deleted:false,
    category:{$in:arrayId}
  })
 

  const filterCategory = req.query.category
  const filterPrice = req.query.price
  if(filterPrice||filterCategory){
    if(filterPrice){
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
      if (Object.keys(priceCurrent).length > 0) {
        find.priceBook = priceCurrent
      }       
    }
    else if(filterCategory){
      const arrayCategory = await categoryHelper.categoryChild(filterCategory)
      find.category = {$in:arrayCategory}
    }
    else{
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
      if (Object.keys(priceCurrent).length > 0) {
        find.priceBook = priceCurrent
      }       
      const arrayCategory = await categoryHelper.categoryChild(filterCategory)
      find.category = {$in:arrayCategory}      
    }
    
  }
  const sort= {}
  if(req.query.sort){
    sort.priceBook = req.query.sort
  }
  const limit =10
  let page =1

  const skip = (page-1)*limit
  const totalPage = Math.ceil(totalBook/limit)

  const allBook = await Book
  .find(find)
  .sort(sort)
  res.render("client/pages/book",{
    pageTitle:"Danh sách sách",
    dataCategory:dataCategory,
    filterChild:filterChildTree,
    totalBook:totalBook,
    allBook:allBook,
    breadList:breadList,
    totalPage:totalPage
  });
}

module.exports.detail = async (req,res) =>{
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
    bookCurrent:bookCurrent,
    parent:parent,
    parents:parents,
    parentss:parentss,
  });
}
