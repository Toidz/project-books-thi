const router = require("express").Router();
const contactController = require("../../controllers/admin/contact.controller");
router.get("/",contactController.contact);
module.exports = router;