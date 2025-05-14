const router = require("express").Router();
const bookRouter = require("./book.route");
const homeRouter = require("./home.route");
const cartRouter = require("./cart.route");
router.use("/book",bookRouter);
router.use("/",homeRouter);
router.use("/cart",cartRouter);
module.exports = router;
