const router = require("express").Router();

const cartController = require("../controllers/cart.controller");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");

router.get("/cart", auth, asyncHandler(cartController.getCart));
router.post("/cart/items", auth, asyncHandler(cartController.addToCart));
router.patch("/cart/items/:id", auth, asyncHandler(cartController.updateCartItem));
router.delete("/cart/items/:id", auth, asyncHandler(cartController.removeCartItem));
router.delete("/cart", auth, asyncHandler(cartController.clearCart));

module.exports = router;

module.exports = router;