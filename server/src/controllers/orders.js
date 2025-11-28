const prisma = require("../db/prisma");

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to load orders" });
  }
};

exports.getOrderById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Failed to load order" });
  }
};

exports.createOrder = async (req, res) => {
  const { customerId, items } = req.body;

  try {
    // calculate total
    let total = 0;
    items.forEach((i) => {
      total += i.price * i.quantity;
    });

    const order = await prisma.order.create({
      data: {
        customerId,
        total,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.updateOrder = async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  try {
    const updated = await prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
};

exports.deleteOrder = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    await prisma.order.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
