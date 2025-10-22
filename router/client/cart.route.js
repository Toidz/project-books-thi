const router = require("express").Router();
const cartController = require("../../controllers/client/cart.controller");
router.get("/",cartController.cart);
router.post("/add",cartController.cartAddPost);
router.post("/edit",cartController.cartEditPost);
router.post("/update-check",cartController.cartCheckUpdatePost);
router.get("/delete",cartController.cartDelete);
module.exports = router;
