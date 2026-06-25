const router = require("express").Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const asyncHandler = require("../middleware/asyncHandler");

const orderController = require("../controllers/order.controller");

router.post("/checkout", auth, asyncHandler(orderController.checkout));
router.get("/", auth, asyncHandler(orderController.getAll));
router.get("/:id", auth, asyncHandler(orderController.getOne));
router.patch("/:id/status", auth, adminOnly, asyncHandler(orderController.updateStatus));

module.exports = router;