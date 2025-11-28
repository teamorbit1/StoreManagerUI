const prisma = require("../db/prisma");

exports.getProducts = async (req, res, next) => {
  try {
    const { search, category, sortBy, sortOrder } = req.query;

    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } }
      ];
    }
    if (category) {
      where.category = category;
    }

    const orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const products = await prisma.product.findMany({
      where,
      orderBy
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        image: image || null
      }
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price, category, stock, image } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        image: image || null
      }
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
