const router = require("express").Router();
const accountRouter = require("./account.route");
const dashboardRouter = require("./dashboard.route");
const categoryRouter = require("./category.route");
const contactRouter = require("./contact.route");
const orderRouter = require("./order.route");
const profileRouter = require("./profile.route");
const settingRouter = require("./setting.route");
const bookRouter = require("./book.route");
// const userRouter = require("./user.route");
const errorController = require("../../controllers/admin/error.controller");
const authMidderWare = require("../../middlewares/admin/auth.middleware")
const infoMiddleware = require("../../middlewares/client/infowebsite.middleware")

router.use(infoMiddleware.info)
router.use("/account",accountRouter);
router.use("/dashboard",authMidderWare.verifyToken,dashboardRouter);
router.use("/category",authMidderWare.verifyToken,categoryRouter);
router.use("/contact",authMidderWare.verifyToken,contactRouter);
router.use("/order",authMidderWare.verifyToken,orderRouter);
router.use("/profile",authMidderWare.verifyToken,profileRouter);
router.use("/setting",authMidderWare.verifyToken,settingRouter);
router.use("/book",authMidderWare.verifyToken,bookRouter);
// router.use("/user",authMidderWare.verifyToken,userRouter);
router.get("*",authMidderWare.verifyToken,errorController.error);

module.exports = router;