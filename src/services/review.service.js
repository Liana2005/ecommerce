const prisma = require("../db");
const AppError = require("../utils/AppError");

const getProductReviews = async (productId) => {
  return prisma.review.findMany({
    where: {
      productId: Number(productId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const create = async (userId, productId, data) => {
  const reviewExists = await prisma.review.findFirst({
    where: {
      userId,
      productId: Number(productId),
    },
  });

  if (reviewExists) {
    throw new AppError(
      "You already reviewed this product",
      400
    );
  }

  return prisma.review.create({
    data: {
      userId,
      productId: Number(productId),
      rating: data.rating,
      comment: data.comment,
    },
  });
};

const remove = async (reviewId, user) => {
  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  });

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  if (
    review.userId !== user.id &&
    user.role !== "admin"
  ) {
    throw new AppError("Forbidden", 403);
  }

  await prisma.review.delete({
    where: {
      id: Number(reviewId),
    },
  });
};

module.exports = {
  getProductReviews,
  create,
  remove,
};