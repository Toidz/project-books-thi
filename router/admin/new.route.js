const router = require("express").Router();
const newController = require("../../controllers/admin/new.controller");
const cloudinaryHelper = require("../../helpers/cloudinary.helper")
const multer  = require('multer')
const upload = multer({ storage: cloudinaryHelper.storage })
router.get("/list",newController.list);

router.get("/create",newController.create);

router.post("/create",
    upload.single('avatar'),
    newController.createPost)

router.patch("/changePatch",newController.changePatch)

router.get("/edit/:id",newController.edit) 

router.patch(
    "/edit/:id",
    upload.single('avatar'),
    newController.editPatch) 

router.patch("/delete/:id",newController.deletePatch)

module.exports = router;