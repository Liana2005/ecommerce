const router = require("express").Router();

const categoryController = require("../controllers/category.controller");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

router.get("/", asyncHandler(categoryController.getAllCategories));
router.post("/", auth, adminOnly, asyncHandler(categoryController.createCategory));
router.delete("/:id", auth, adminOnly, asyncHandler(categoryController.deleteCategory));

module.exports = router;