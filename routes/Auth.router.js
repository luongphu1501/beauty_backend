const express = require("express")
const UserController = require("../controller/User");
const { adminAuth } = require("../middleware/cookie.middleware");

const router = express.Router();


router.post("/signup", UserController.Signup)
router.post("/login", UserController.Login)
router.post("/update", UserController.postUpdateUser)
router.get("/paginate", adminAuth, UserController.getUserPageinate)

module.exports = router