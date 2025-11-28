const prisma = require("../db/prisma");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: true,
      },
    });

    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: "Failed to load customers" });
  }
};
