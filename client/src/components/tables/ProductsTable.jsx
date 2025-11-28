export default function ProductsTable({ products, onEdit, onDelete }) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th style={{ textAlign: "right" }}>Price</th>
              <th style={{ textAlign: "right" }}>Stock</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td style={{ textAlign: "right" }}>${p.price.toFixed(2)}</td>
                <td style={{ textAlign: "right" }}>
                  {p.stock}
                  {p.stock < 10 && (
                    <span className="badge badge-low" style={{ marginLeft: 6 }}>
                      Low
                    </span>
                  )}
                </td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => onEdit(p)}
                    style={{ marginRight: 4 }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => onDelete(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "1rem", textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  