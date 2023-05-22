const express = require("express")
const category = require("../controller/Category")
const router = express.Router();

router.get("/gethome", category.getCategory)
router.get('/getbyid', category.getCategoryById)
module.exports = router