const express = require("express")
const orders = require("../controller/Order")
const router = express.Router();

router.post("/create", orders.createOrder)
router.get("/paginate", orders.getOrderAdmin)
router.get("/revenue", orders.getRevenueStat)
router.get("/product", orders.getProductStat)
router.get("/productrenevue", orders.getProductRenevue)
router.post("/update", orders.updateOrder)
router.get("/:order_id", orders.getDetailOrderbyId)

module.exports = router