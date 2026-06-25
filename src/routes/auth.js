const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../middleware/asyncHandler");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.get("/me", asyncHandler(authController.me));

module.exports = router;
