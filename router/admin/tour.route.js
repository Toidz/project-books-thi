const router = require("express").Router();
const tourController = require("../../controllers/admin/tour.controller");
const cloudinaryHelper = require("../../helpers/cloudinary.helper")
const multer  = require('multer')
const upload = multer({ storage: cloudinaryHelper.storage })
const tourValidate = require("../../validates/admin/tour.validate")
router.get("/list",tourController.list);

router.get("/create",tourController.create);

router.post("/create",
    upload.single('avatar'),
    tourValidate.tourPost,
    tourController.createPost)

router.patch("/changePatch",tourController.changePatch)

router.get("/edit/:id",tourController.edit) 

router.patch(
    "/edit/:id",
    upload.single('avatar'),
    tourValidate.tourPost,
    tourController.editPatch) 

router.patch("/delete/:id",tourController.deletePatch)

router.get("/trash",tourController.trash);
router.patch("/trash",tourController.trashMulti)
router.patch("/restore/:id",tourController.restore)
router.patch("/destroy/:id",tourController.destroy)
module.exports = router;