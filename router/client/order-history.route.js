const router = require("express").Router();
const orderHistoryController = require("../../controllers/client/order-history.controller");
router.get("/",orderHistoryController.list);
module.exports = router;
 