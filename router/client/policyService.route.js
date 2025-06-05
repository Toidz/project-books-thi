const router = require("express").Router();
const policyServiceController = require("../../controllers/client/policyService.controller");
router.get("/policy",policyServiceController.policy);
router.get("/service",policyServiceController.service);
module.exports = router;
 