const router = require("express").Router();
const bookRouter = require("./book.route");
const homeRouter = require("./home.route");
const cartRouter = require("./cart.route");
const contactRouter = require("./contact.route")
const infoMiddleware = require("../../middlewares/client/infowebsite.middleware")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRouter = require("./seach.route")
const orderRouter = require("./order.route")
const newRouter = require("./new.route")
const contactClientRouter = require("./contactClient.route")
const policyServiceRouter = require("./policyService.route")

router.use(infoMiddleware.info)
router.use(categoryMiddleware.category)

router.use("/book",bookRouter);
router.use("/",homeRouter);
router.use("/cart",cartRouter);
router.use("/contact",contactRouter);
router.use("/search",searchRouter);
router.use("/order",orderRouter);
router.use("/new",newRouter);
router.use("/contact-client",contactClientRouter);
router.use("/policy-service",policyServiceRouter);
module.exports = router;
