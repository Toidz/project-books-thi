const router = require("express").Router();
const settingController = require("../../controllers/admin/setting.controller");
const cloudinaryHeleper = require("../../helpers/cloudinary.helper")
var multer = require('multer');
const upload = multer({ storage: cloudinaryHeleper.storage });
var uploadMiddleware = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
]);

router.get("/list",settingController.list);

router.get("/account-admin/create",settingController.accountAdminCreate);

router.get("/account-admin/list",settingController.accountAdminList);

router.get("/role/list",settingController.roleList);

router.get("/role/create",settingController.roleCreate);

router.get("/website/info",settingController.websiteInfo);
router.patch("/website/info",
    uploadMiddleware,
    settingController.websiteInfoPatch);
module.exports = router;