const orderService = require("../services/order.service");

class OrderController {
  async checkout(req, res) {
    const order = await orderService.checkout(req.user.id);

    res.status(201).json(order);
  }

  async getAll(req, res) {
    const orders = await orderService.getAll(req.user);

    res.json(orders);
  }

  async getOne(req, res) {
    const order = await orderService.getOne(req.params.id);

    res.json(order);
  }

  async updateStatus(req, res) {
    const order = await orderService.updateStatus(
      req.params.id,
      req.body.status
    );

    res.json(order);
  }
}

module.exports = new OrderController();