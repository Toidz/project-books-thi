const router = require("express").Router();
const cartController = require("../../controllers/client/cart.controller");
router.get("/",cartController.cart);
router.post("/detail",cartController.cartPost);
module.exports = router;
