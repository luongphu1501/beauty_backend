const express = require("express")
const UserController = require("../controller/User")
const router = express.Router();

router.post("/signup", UserController.Signup)
router.post("/login", UserController.Login)
router.get("/paginate", UserController.getUserPageinate)

module.exports = router