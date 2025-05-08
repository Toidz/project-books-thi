const Tour = require("../../models/tour.model");
module.exports.tour = async (req, res) => {
  const tourList = await Tour.find({});
  res.render("client/pages/tours",{
    pageTitle:"Danh sach Tour",
    tourList: tourList
  });
}

module.exports.detail = (req,res) =>{
  res.render("client/pages/tour-detail",{
    pageTitle:"Chi tiết tour"
  });
}
