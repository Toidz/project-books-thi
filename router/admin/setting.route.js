const router = require("express").Router();
const settingController = require("../../controllers/admin/setting.controller");
router.get("/list",settingController.list);
router.get("/account-admin/create",settingController.accountAdminCreate);
router.get("/account-admin/list",settingController.accountAdminList);
router.get("/role/list",settingController.roleList);
router.get("/role/create",settingController.roleCreate);
router.get("/website/info",settingController.websiteInfo);
module.exports = router;