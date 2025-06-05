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
  const limit =6
  const totalPage = Math.ceil(totalBook/limit)
  let page =1
  if(req.query.page>0){
    page = req.query.page
  }
  if(req.query.page>totalPage){
    page=totalPage
  }
  const skip = (page-1)*limit

  const allBook = await Book
  .find(find)
  .sort(sort)
  .skip(skip)
  .limit(limit)
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
  const slug = req.params.slug
  const book = await Book.findOne({
    slug:slug,
    deleted:false,
  })
  if(book){
    const category = await Category.findOne({
      _id:book.category
    })
    const bread ={
      title:book.name,
      image:book.avatar1,
      desc:book.information,
      list:[
        {
        link:"/",
        name:"Trang chủ"
      }]
    }

    if(category.parent){
      const parent = await Category.findOne({
        _id:category.parent
      })
      bread.list.push({
        link:`/book/${parent.slug}`,
        name:parent.name
      })
    }
    bread.list.push({
      link:`/book/${category.slug}`,
      name:category.name
    })
    bread.list.push({
      link:`/book/detail/${book.slug}`,
      name:book.name
    })
    res.render("client/pages/book-detail",{
      pageTitle:"Chi tiết sách",
      category:category,
      bread:bread,
      book:book,
    });
  }
  else{
    res.redirect("/")
  }
}
