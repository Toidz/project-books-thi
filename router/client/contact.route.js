const router = require("express").Router()
const contactController = require("../../controllers/client/contact.controller")
router.post("/",contactController.createPost)
module.exports= router;