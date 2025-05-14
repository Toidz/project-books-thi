const Book = require("../../models/book.model");
module.exports.book = async (req, res) => {
  res.render("client/pages/tours",{
    pageTitle:"Danh sach Tour",
  });
}

module.exports.detail = (req,res) =>{
  res.render("client/pages/tour-detail",{
    pageTitle:"Chi tiết tour"
  });
}
