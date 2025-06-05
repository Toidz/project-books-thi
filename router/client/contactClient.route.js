 const router = require("express").Router();
 const contactClientController = require("../../controllers/client/contactClient.controller");
 router.get("/",contactClientController.show);
 module.exports = router;
 