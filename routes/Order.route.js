const express = require("express")
const orders = require("../controller/Order");
const payment = require("../controller/Payment")
const { adminAuth, userAuth } = require("../middleware/cookie.middleware");
const router = express.Router();

router.post("/create", orders.createOrder)
router.get("/myorder", orders.getOrderUser)
router.post("/cancel", userAuth, orders.cancelOrder)
router.post("/payment", payment.postPayment)
router.get("/paginate", adminAuth, orders.getOrderAdmin)
router.get("/revenue", adminAuth, orders.getRevenueStat)
router.get("/product", adminAuth, orders.getProductStat)
router.get("/productrenevue", adminAuth, orders.getProductRenevue)
router.post("/update", adminAuth, orders.updateOrder)
router.get("/data/dashboard", orders.getDataDashboard)
router.get("/data/chart", orders.getDataChart)
router.get("/:order_id", orders.getDetailOrderbyId)

module.exports = router