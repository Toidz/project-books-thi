const router = require("express").Router();
const bookController= require("../../controllers/client/book.controller");
router.get("/",bookController.book);
router.get("/detail",bookController.detail);
module.exports = router;
