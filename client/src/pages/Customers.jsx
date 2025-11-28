import { useEffect, useState } from "react";
import { fetchCustomers } from "../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-title">Customers</div>
          <div className="page-subtitle">Registered shoppers</div>
        </div>
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
            </tr>
          </thead>

          <tbody>
            {!customers &&
              [...Array(6)].map((_, i) => (
                <tr key={i}>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                  <td><div className="skeleton skel-table-row"></div></td>
                </tr>
              ))
            }

            {customers &&
              customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.orders ? c.orders.length : 0}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
