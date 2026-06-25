const prisma = require("../db");

async function getAllCategories() {
  return prisma.categories.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

async function createCategory(name, description) {
  const existingCategory = await prisma.categories.findUnique({
    where: { name },
  });

  if (existingCategory) {
    const error = new Error("Category already exists");
    error.statusCode = 409;
    throw error;
  }

  return prisma.categories.create({
    data: {
      name,
      description,
    },
  });
}

async function deleteCategory(id) {
  const category = await prisma.categories.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.categories.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Category deleted successfully",
  };
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};