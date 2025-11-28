import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

export default function Products() {
  const [items, setItems] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts().then(setItems);
  }, []);

  function openNewProduct() {
    setEditing(null);
    setForm({ name: "", price: "", stock: "" });
    setModalOpen(true);
  }

  function openEditProduct(product) {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    let updatedList;

    if (editing) {
      const updated = await updateProduct(editing.id, payload);
      updatedList = items.map((p) => (p.id === editing.id ? updated : p));
    } else {
      const created = await createProduct(payload);
      updatedList = [...items, created];
    }

    setItems(updatedList);
    setModalOpen(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    await deleteProduct(id);
    setItems(items.filter((p) => p.id !== id));
  }

  return (
    <>
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-title">Products</div>
          <div className="page-subtitle">Manage store inventory</div>
        </div>

        <button className="btn btn-primary" onClick={openNewProduct}>
          Add Product
        </button>
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!items &&
              [...Array(6)].map((_, i) => (
                <tr key={i}>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                </tr>
              ))}

            {items &&
              items.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>

                  <td>
                    {p.stock <= 5 ? (
                      <span className="badge badge-low">{p.stock}</span>
                    ) : (
                      p.stock
                    )}
                  </td>

                  <td>${p.price.toFixed(2)}</td>

                  <td>
                    <button className="btn btn-ghost" onClick={() => openEditProduct(p)}>
                      Edit
                    </button>

                    <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <header>
              {editing ? "Edit Product" : "Add Product"}
            </header>

            <form>
              <input
                className="input"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="input"
                placeholder="Price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                className="input"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </form>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
