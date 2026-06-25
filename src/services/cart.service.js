const prisma = require('../db')

async function getCart  (userId)  {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
};

async function addToCart  (userId, productId, quantity = 1)  {
  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  async function existingItem() { await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: Number(productId),
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  }


  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: Number(productId),
      quantity,
    },
  });
};
}

async function updateCartItem  (itemId, quantity)  {
  const item = await prisma.cartItem.findUnique({
    where: { id: Number(itemId) },
  });

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.cartItem.update({
    where: { id: Number(itemId) },
    data: { quantity },
  });
};

async function removeCartItem  (itemId) {
  const item = await prisma.cartItem.findUnique({
    where: { id: Number(itemId) },
  });

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.cartItem.delete({
    where: { id: Number(itemId) },
  });

  return { message: "Item removed from cart" };
};

async function clearCart(userId)  {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    return { message: "Cart is empty" };
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return { message: "Cart cleared" };
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};