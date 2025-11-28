const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/productRoutes");
const statsRouter = require("./routes/statsRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StoreManager API is running");
});

app.use("/api/products", productsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/overview", statsRouter);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

module.exports = app;
