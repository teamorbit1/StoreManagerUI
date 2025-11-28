const prisma = require("../db/prisma");

exports.getOverview = async (req, res, next) => {
  try {
    const [totalRevenue, ordersCount, productsCount, lowStock] =
      await Promise.all([
        prisma.order.aggregate({ _sum: { total: true } }),
        prisma.order.count(),
        prisma.product.count(),
        prisma.product.count({ where: { stock: { lt: 10 } } })
      ]);

    const last7days = await prisma.order.groupBy({
      by: ["createdAt"],
      _sum: { total: true },
      orderBy: { createdAt: "asc" },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5
    });

    const productIds = topProducts.map((p) => p.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    const topProductsDetailed = topProducts.map((tp) => ({
      id: tp.productId,
      name: products.find((p) => p.id === tp.productId)?.name || "Unknown",
      quantity: tp._sum.quantity || 0
    }));

    res.json({
      totals: {
        revenue: totalRevenue._sum.total || 0,
        orders: ordersCount,
        products: productsCount,
        lowStock
      },
      last7days,
      topProducts: topProductsDetailed
    });
  } catch (err) {
    next(err);
  }
};
