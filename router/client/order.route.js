const router = require("express").Router();
const orderController = require("../../controllers/client/order.controller");
router.post("/create",orderController.create);
router.get("/success",orderController.success);
router.get("/payment-zalopay",orderController.zalopay);
router.post("/payment-zalopay-result",orderController.zalopayPost);

// router.get("/payment-vnpay",orderController.vnpay);
// router.post("/payment-vnpay-result",orderController.vnpayPost);
module.exports = router;
