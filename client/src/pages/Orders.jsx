import { useEffect, useState } from "react";
import { fetchOrders } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-title">Orders</div>
          <div className="page-subtitle">Customer purchase history</div>
        </div>
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {!orders &&
              [...Array(6)].map((_, i) => (
                <tr key={i}>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                </tr>
              ))
            }

            {orders &&
              orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>${o.total.toFixed(2)}</td>
                  <td>
                    {new Date(o.createdAt || o.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
