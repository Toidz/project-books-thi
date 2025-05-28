const Book = require("../../models/book.model")
module.exports.cart = (req,res)=>{
    res.render("client/pages/cart",{
        pageTitle:"Trang giỏ hàng"
    });
}

module.exports.cartPost = async (req,res)=>{
    for (const item of req.body) {
        const book = await Book.findOne({
            _id:item.id,
            deleted:false,
        })
        if(book){
            item.bookCode = book.bookCode
            item.avatar = book.avatar1
            item.slug = book.slug
            item.name=book.name
            item.produce = book.produce
            item.author = book.author
            item.priceBook = book.priceBook
        }
        else{
            const indexItem = req.body.findIndex(book => book.id == item.id)
            req.body.splice(indexItem,1)
        }
    }
    console.log(req.body)
    req.flash("Thêm vào giỏ hàng thành công!")
    res.json({
        code:"success",
        cart:req.body
    })
}