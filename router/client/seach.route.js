const router = require("express").Router()
const seachController = require("../../controllers/client/seach.controller")
router.get("/",seachController.list);
module.exports= router