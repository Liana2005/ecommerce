const prisma = require("../db");
const AppError = require("../utils/AppError");

class OrderService {
  async checkout(userId) {
    const cart = await prisma.carts.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!cart || cart.cartItems.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    const total = cart.cartItems.reduce((sum, item) => {
      return sum + Number(item.products.price) * item.quantity;
    }, 0);

    const order = await prisma.orders.create({
      data: {
        userId: userId,
        total,
        status: "pending",
      },
    });

    await prisma.orderItems.createMany({
      data: cart.cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
       
      })),
    });

    await prisma.cart_items.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return order;
  }

  async getAll(user) {
    if (user.role === "admin") {
      return prisma.orders.findMany({
        include: {
          order_items: true,
        },
      });
    }

    return prisma.orders.findMany({
      where: {
        userId: user.id,
      },
      include: {
        orderItems: true,
      },
    });
  }

  async getOne(orderId) {
    const order = await prisma.orders.findUnique({
      where: {
        id: Number(orderId),
      },
      include: {
        orderItems: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }

  async updateStatus(orderId, status) {
    return prisma.orders.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status,
      },
    });
  }
}

module.exports = new OrderService();