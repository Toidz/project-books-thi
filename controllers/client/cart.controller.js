const jwt = require("jsonwebtoken")
const Book = require("../../models/book.model")
const AccountClient = require("../../models/account-client.model")
const Cart = require("../../models/cart.model")
module.exports.cart = async (req,res)=>{
  const listItem = await Cart.find({
    id_user:req.account.id,
    deleted:false
  })
  for (const item of listItem) {
    const book = await Book.findOne({
      _id:item.id_book,
      deleted:false
    })
    item.name = book?.name;
    item.bookCode = book?.bookCode;
    item.author = book?.author;
    item.produce = book?.produce;
    item.priceBook = book?.priceBook;
    item.slug = book?.slug;
    item.avatar = book?.avatar1;
    item.stock = book?.numberBook;
  }
  res.render("client/pages/cart",{
    pageTitle:"Trang giỏ hàng",
    listItem:listItem
  });
}
module.exports.cartAddPost = async (req,res)=>{
  const existCart = await Cart.findOne({
    id_book:req.body.id_book,
    id_user:req.body.id_user,
    deleted:false
  })
  const existBook = await Book.findOne({
    _id:req.body.id_book,
    deleted:false
  })
  if(!existCart) {
    if(existBook.numberBook==0){
      res.json({
        code:"error",
        message:"Sản phẩm hiện tại hết hàng!"
      })
      return;
    }
    const item = new Cart({
      id_book: req.body.id_book,
      quantity: parseInt(req.body.numberBook),
      id_user: req.body.id_user,
      checkItem: req.body.checkItem
    })
    await item.save()
  }
  else{
    if(parseInt(existBook.numberBook)<(parseInt(existCart.quantity)+parseInt(req.body.numberBook))){
      res.json({
        code:"error",
        message:"Số lượng sản phẩm vượt quá số lượng trong kho!"
      })
      return;
    }
    await Cart.updateOne({
      _id:existCart.id
    },{
      quantity:parseInt(existCart.quantity)+parseInt(req.body.numberBook)
    })
  }
  req.flash("success","Thêm sản phẩm vào giỏ hàng thành công!");
  res.json({
      code:"success",
      message:"Thêm sản phẩm thành công!"
  })
}
module.exports.cartEditPost = async (req,res)=>{
  const {quantityNew,idBook,idUser} = req.body

  await Cart.updateOne({
    id_book:idBook,
    id_user:idUser,
    deleted:false
  },{
    quantity:parseInt(quantityNew)
  })
  // req.flash("success","Cập nhật số lượng sản phẩm thành công!")
  res.json({
    code:"success",
    message:"Cập nhật số lượng sản phẩm thành công!"
  })
}

module.exports.cartCheckUpdatePost = async (req,res)=>{
  await Cart.updateOne(
    {
      id_book: req.body.idBook,
      id_user: req.body.idUser,
      deleted: false
    },
    {
      checkItem: req.body.checkItem
    }
  );

  res.json({
    code: "success",
    message: "Cập nhật trạng thái sản phẩm thành công!"
  });
  
};

module.exports.cartDelete= async (req,res)=>{
  const id_cart = req.query.id_cart;
  const id_book = req.query.id_book;
  await Cart.deleteOne(
    {
      _id: id_cart,
      id_book: id_book,
    },
  );
  req.flash("success","Xóa sản phẩm trong giỏ hàng thành công!")
  res.json({
    code: "success",
    message: "Xóa sản phẩm trong giỏ hàng thành công!"
  });
  
};
