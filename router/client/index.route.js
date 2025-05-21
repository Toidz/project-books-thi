const router = require("express").Router();
const bookRouter = require("./book.route");
const homeRouter = require("./home.route");
const cartRouter = require("./cart.route");
const contactRouter = require("./contact.route")
const infoMiddleware = require("../../middlewares/client/infowebsite.middleware")
const categoryMiddleware = require("../../middlewares/client/category.middleware")

router.use(infoMiddleware.info)
router.use(categoryMiddleware.category)

router.use("/book",bookRouter);
router.use("/",homeRouter);
router.use("/cart",cartRouter);
router.use("/contact",contactRouter);
module.exports = router;
