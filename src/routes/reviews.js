const router = require("express").Router();

const auth = require("../middleware/auth");
const asyncHandler = require("../middleware/asyncHandler");

const reviewController = require("../controllers/review.controller");

router.get( "/products/:id/reviews",asyncHandler(reviewController.getProductReviews));
router.post( "/products/:id/reviews",auth,asyncHandler(reviewController.create));
router.delete( "/reviews/:id", auth,asyncHandler(reviewController.remove));

module.exports = router;