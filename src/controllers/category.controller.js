const categoryService = require("../services/category.service");

async function getAllCategories(req, res) {
  const categories = await categoryService.getAllCategories();

  res.json(categories);
}

async function createCategory(req, res) {
  const { name, description } = req.body;

  const category = await categoryService.createCategory(
    name,
    description
  );

  res.status(201).json(category);
}

async function deleteCategory(req, res) {
  const result = await categoryService.deleteCategory(
    req.params.id
  );

  res.json(result);
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};