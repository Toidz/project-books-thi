const Book = require("../../models/book.model")
const slugify = require("slugify")
module.exports.list = async (req,res)=>{
  const find ={
    deleted:false
  }
    const slug = slugify(req.query.keyword,{
      lower:true
    })
    const regex = new RegExp(slug)
    find.slug = regex
  
  const totalBook = await Book.countDocuments({
    slug : regex
  })

  let total =0
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


  const listBook = await Book
  .find(find)
  .skip(skip)
  .limit(limit)

  res.render("client/pages/search",{
    pageTitle:"Kết quả tìm kiếm",
    listBook:listBook,
    totalBook:totalBook,
    totalPage:totalPage
  })
}