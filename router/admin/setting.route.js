const router = require("express").Router();
const settingController = require("../../controllers/admin/setting.controller");
const cloudinaryHeleper = require("../../helpers/cloudinary.helper")
var multer = require('multer');
const upload = multer({ storage: cloudinaryHeleper.storage });

router.get("/list",settingController.list);

router.patch("/account-admin/changePatch",settingController.accountAdminChangePatch);
router.get("/account-admin/create",settingController.accountAdminCreate);
router.post("/account-admin/create", 
  upload.single('avatar'),
  settingController.accountAdminCreatePost
);
router.get("/account-admin/list",settingController.accountAdminList);
router.get("/account-admin/edit/:id",settingController.accountAdminEdit);
router.patch("/account-admin/edit/:id",
  upload.single('avatar'),
  settingController.accountAdminEditPatch
);
router.patch("/account-admin/delete/:id",settingController.accountAdminDeletePatch);

router.get("/role/list",settingController.roleList);
router.patch("/role/list",settingController.roleListPatch);

router.get("/role/create",settingController.roleCreate);
router.post("/role/create",settingController.roleCreatePost);

router.get("/role/edit/:id",settingController.roleEdit)
router.patch("/role/edit/:id",settingController.roleEditPatch)

router.patch("/role/delete/:id",settingController.roleDeletePatch)

router.get("/website/info",settingController.websiteInfo);
router.patch("/website/info",
    upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
    ]),
    settingController.websiteInfoPatch);
module.exports = router;