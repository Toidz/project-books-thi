const router = require("express").Router()
const infoUserController = require("../../controllers/client/infoUser.controller")
router.get("/",infoUserController.getInfoUser)
router.post("/edit",infoUserController.postInfoUser)

module.exports = router