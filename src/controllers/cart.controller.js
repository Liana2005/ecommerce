const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
  const cart = await cartService.getCart(req.user.id);

  res.json(cart);
};

const addItem = async (req, res) => {
  const item = await cartService.addItem(
    req.user.id,
    req.body
  );

  res.status(201).json(item);
};

const updateItem = async (req, res) => {
  const item = await cartService.updateItem(
    req.params.id,
    req.body.quantity
  );

  res.json(item);
};

const removeItem = async (req, res) => {
  await cartService.removeItem(req.params.id);

  res.json({
    message: "Item removed from cart",
  });
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
};