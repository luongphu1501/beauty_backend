const express = require("express")
const product = require("../controller/Product")
const router = express.Router();

router.get("/getproduct", product.getProduct)
router.get("/getbyid/", product.getProductById)
router.post("/create", product.addProduct)
router.post("/update", product.updateProduct)
router.get("/paginate", product.getProductPageinate)
router.get("/search", product.searchProduct)
router.get("/category", product.getProductByCategory)
module.exports = router