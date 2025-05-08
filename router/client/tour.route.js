const router = require("express").Router();
const tourController= require("../../controllers/client/tour.controller");
router.get("/",tourController.tour);
router.get("/detail",tourController.detail);
module.exports = router;
