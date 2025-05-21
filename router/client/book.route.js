const router = require("express").Router();
const bookController= require("../../controllers/client/book.controller");

router.get("/:slug",bookController.book);

router.get("/detail/:slug",bookController.detail);
module.exports = router;
