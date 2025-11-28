import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const sampleOrders = [
    {
      id: 101,
      customerId: 1,
      customer: "John Doe",
      total: 99.99,
      date: "2025-02-10T14:32:00Z",
    },
    {
      id: 102,
      customerId: 2,
      customer: "Sarah Lee",
      total: 49.99,
      date: "2025-01-11T10:15:00Z",
    },
    {
      id: 103,
      customerId: 1,
      customer: "John Doe",
      total: 149.99,
      date: "2025-02-12T09:20:00Z",
    },
  ];
  const sampleCustomers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      orders: sampleOrders.filter((o) => o.customerId === 1),
    },
    {
      id: 2,
      name: "Sarah Lee",
      email: "sarah@example.com",
      orders: sampleOrders.filter((o) => o.customerId === 2),
    },
  ];
  
  const sampleOverview = {
    totals: {
      revenue: sampleOrders.reduce((s, o) => s + o.total, 0),
      orders: sampleOrders.length,
      products: 25,
      lowStock: 2,
    },
    last7days: [
      { _sum: { total: 253.24 } },
      { _sum: { total: 103.78 } },
      { _sum: { total: 189.64 } },
      { _sum: { total: 232.41 } },
      { _sum: { total: 171.52 } },
      { _sum: { total: 373.51 } },
      { _sum: { total: 597.18 } },
    ],
    topProducts: [
      { id: 23, name: "Product 23", quantity: 11 },
      { id: 12, name: "Product 12", quantity: 7 },
    ],
  };
  
  let sampleProducts = [
    { id: 1, name: "Keyboard RGB", price: 89.99, stock: 12 },
    { id: 2, name: "Gaming Mouse", price: 59.99, stock: 6 },
    { id: 3, name: "Headset Mic", price: 129.99, stock: 3 },
  ];  

  export async function fetchOverviewStats() {
    try {
      const res = await API.get("/overview");
      return res.data;
    } catch {
      console.warn("API /overview failed — using sample data");
      return sampleOverview;
    }
  }
  
  export async function fetchCustomers() {
    try {
      const res = await API.get("/customers");
      return res.data;
    } catch {
      console.warn("API /customers failed — using sample data");
      return sampleCustomers;
    }
  }
  
  export async function fetchOrders() {
    try {
      const res = await API.get("/orders");
      return res.data;
    } catch {
      console.warn("API /orders failed — using sample data");
      return sampleOrders;
    }
  }
  
  export async function fetchProducts() {
    try {
      const res = await API.get("/products");
      return res.data;
    } catch {
      console.warn("API /products failed — using sample fallback");
      return sampleProducts;
    }
  }
  
  export async function createProduct(product) {
    try {
      const res = await API.post("/products", product);
      return res.data;
    } catch {
      console.warn("API createProduct failed — using sample fallback");
  
      const newItem = {
        id: sampleProducts.length + 1,
        ...product,
      };
  
      sampleProducts.push(newItem);
      return newItem;
    }
  }
  
  export async function updateProduct(id, updates) {
    try {
      const res = await API.put(`/products/${id}`, updates);
      return res.data;
    } catch {
      console.warn("API updateProduct failed — using sample fallback");
  
      sampleProducts = sampleProducts.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
  
      return sampleProducts.find((p) => p.id === id);
    }
  }
  
  export async function deleteProduct(id) {
    try {
      const res = await API.delete(`/products/${id}`);
      return res.data;
    } catch {
      console.warn("API deleteProduct failed — using sample fallback");
  
      sampleProducts = sampleProducts.filter((p) => p.id !== id);
  
      return { success: true };
    }
  }
  


