const productService = require("../services/product.service");

const getAll = async (req, res) => {
  const products = await productService.getAll();

  res.json(products);
};

const getOne = async (req, res) => {
  const product = await productService.getOne(req.params.id);

  res.json(product);
};

const create = async (req, res) => {
  const product = await productService.create(req.body);

  res.status(201).json(product);
};

const update = async (req, res) => {
  const product = await productService.update(
    req.params.id,
    req.body
  );

  res.json(product);
};

const remove = async (req, res) => {
  await productService.remove(req.params.id);

  res.json({
    message: "Product deleted",
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};