const router = require("express").Router()
const seachController = require("../../controllers/client/seach.controller")
router.post("/",seachController.list);
module.exports= router