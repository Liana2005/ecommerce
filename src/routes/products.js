const router = require("express").Router();

const productController = require("../controllers/product.controller");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

router.get("/", asyncHandler(productController.getAll));

router.get("/:id", asyncHandler(productController.getOne));
router.post( "/",auth,adminOnly,asyncHandler(productController.create));
router.patch("/:id",auth,adminOnly,asyncHandler(productController.update));
router.delete("/:id",auth,adminOnly,asyncHandler(productController.remove));

module.exports = router;