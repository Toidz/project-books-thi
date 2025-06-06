const router = require("express").Router()
const uploadController = require("../../controllers/admin/upload.controller")
const cloudinaryHelper = require("../../helpers/cloudinary.helper")
const multer  = require('multer')
const upload = multer({ storage: cloudinaryHelper.storage })
router.post("/image",upload.single("file"),uploadController.image)
module.exports=router