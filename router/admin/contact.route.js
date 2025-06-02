const router = require("express").Router();
const contactController = require("../../controllers/admin/contact.controller");
router.get("/",contactController.list);
router.patch("/changePatch",contactController.changPatch);
router.patch("/delete/:id",contactController.deletePatch);
module.exports = router;