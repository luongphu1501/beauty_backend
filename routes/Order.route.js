const express = require("express")
const orders = require("../controller/Order");
const { adminAuth, userAuth } = require("../middleware/cookie.middleware");
const router = express.Router();

router.post("/create", orders.createOrder)
router.get("/myorder", orders.getOrderUser)
router.post("/cancel", userAuth, orders.cancelOrder)
router.get("/paginate", adminAuth, orders.getOrderAdmin)
router.get("/revenue", adminAuth, orders.getRevenueStat)
router.get("/product", adminAuth, orders.getProductStat)
router.get("/productrenevue", adminAuth, orders.getProductRenevue)
router.post("/update", adminAuth, orders.updateOrder)

router.get("/:order_id", orders.getDetailOrderbyId)

module.exports = router