const router = require("express").Router();
const payController = require("../../controllers/client/pay.controller");
router.get("/",payController.pay);
router.post("/detail",payController.payPost);
router.get("/districts", payController.getDistricts); 
router.get("/wards", payController.getWards); 
router.post("/address-create", payController.postAddressCreate);
router.get("/get-current-address",payController.getCurrentAddress);
router.post("/edit-current-address",payController.editCurrentAddress);
router.post("/delete-current-address",payController.deleteCurrentAddress);
router.get("/change-address",payController.changeAddress);
 
module.exports = router;
