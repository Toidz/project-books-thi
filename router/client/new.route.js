const router = require("express").Router();
const newController = require("../../controllers/client/new.controller");
router.get("/:slug",newController.item);
module.exports = router;
 