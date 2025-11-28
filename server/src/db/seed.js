require("dotenv").config();
const prisma = require("./prisma");

const categories = ["Electronics", "Apparel", "Accessories", "Home", "Gaming"];

async function main() {
  console.log("Clearing old data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();

  console.log("Seeding products...");
  const products = await Promise.all(
    Array.from({ length: 25 }).map((_, i) =>
      prisma.product.create({
        data: {
          name: `Product ${i + 1}`,
          description: "Sample product description.",
          price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          category: categories[Math.floor(Math.random() * categories.length)],
          stock: Math.floor(Math.random() * 150),
          image: null,
        },
      })
    )
  );

  console.log("Seeding customers...");
  const customers = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.customer.create({
        data: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: "555-123-4567",
        },
      })
    )
  );

  console.log("Seeding orders...");
  for (let i = 0; i < 30; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];

    const itemCount = Math.floor(Math.random() * 3) + 1;
    let total = 0;

    const itemsData = Array.from({ length: itemCount }).map(() => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = product.price;

      total += price * quantity;

      return {
        productId: product.id,
        quantity,
        price,
      };
    });

    await prisma.order.create({
      data: {
        total: parseFloat(total.toFixed(2)),
        status: ["pending", "shipped", "cancelled"][
          Math.floor(Math.random() * 3)
        ],
        customerId: customer.id,
        items: {
          create: itemsData,
        },
      },
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
