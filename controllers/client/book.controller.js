const Book = require("../../models/book.model");
module.exports.book = async (req, res) => {
  res.render("client/pages/book",{
    pageTitle:"Danh sách sách",
  });
}

module.exports.detail = (req,res) =>{
  res.render("client/pages/book-detail",{
    pageTitle:"Chi tiết sách"
  });
}
