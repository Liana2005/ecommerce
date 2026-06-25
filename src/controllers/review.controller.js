const reviewService = require("../services/review.service");

const getProductReviews = async (req, res) => {
  const reviews = await reviewService.getProductReviews(
    req.params.id
  );

  res.json(reviews);
};

const create = async (req, res) => {
  const review = await reviewService.create(
    req.user.id,
    req.params.id,
    req.body
  );

  res.status(201).json(review);
};

const remove = async (req, res) => {
  await reviewService.remove(
    req.params.id,
    req.user
  );

  res.json({
    message: "Review deleted",
  });
};

module.exports = {
  getProductReviews,
  create,
  remove,
};