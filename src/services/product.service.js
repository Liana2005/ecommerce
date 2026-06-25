const prisma = require("../db");
const AppError = require("../utils/AppError");

const getAll = async () => {
  return prisma.product.findMany({
    include: {
      productCategories: {
        include: {
          category: true,
        },
      },
    },
  });
};

const getOne = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      reviews: true,
    },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const create = async (data) => {
  return prisma.product.create({
    data,
  });
};

const update = async (id, data) => {
  return prisma.product.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const remove = async (id) => {
  return prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};