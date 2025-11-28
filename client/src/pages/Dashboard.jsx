import { useEffect, useState } from "react";
import { fetchOverviewStats } from "../services/api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [renderKey, setRenderKey] = useState(Date.now());

  useEffect(() => {
    fetchOverviewStats().then((data) => {
      setStats(data);
      setRenderKey(Date.now());
    });
  }, []);

  if (!stats) {
    return (
      <>
        <div className="page-header">
          <div className="page-title-block">
            <div className="page-title skeleton" style={{ width: "180px", height: "24px" }}></div>
            <div className="page-subtitle skeleton" style={{ width: "260px", height: "16px" }}></div>
          </div>
        </div>

        <div className="cards-grid">
          <div className="skel-card skeleton"></div>
          <div className="skel-card skeleton"></div>
          <div className="skel-card skeleton"></div>
          <div className="skel-card skeleton"></div>
        </div>

        <div className="dashboard-charts-row">
          <div className="skel-chart skeleton"></div>
          <div className="skel-chart skeleton"></div>
        </div>

        <div className="skel-chart skeleton" style={{ marginTop: "1.5rem" }}></div>
      </>
    );
  }

  const totals = stats.totals;

  const chartData = stats.last7days.map((d, i) => ({
    day: `Day ${i + 1}`,
    revenue: d._sum.total,
  }));

  const topProductsData = stats.topProducts.map((p) => ({
    name: p.name,
    quantity: p.quantity,
  }));

  return (
    <>
      <div className="page-header">
        <div className="page-title-block">
          <div className="page-title">Dashboard Overview</div>
          <div className="page-subtitle">Store performance insights</div>
        </div>
      </div>

      <div className="cards-grid">

        <div className="card card--accent">
          <div className="card-title">Total Revenue</div>
          <div className="card-value">${totals.revenue.toFixed(2)}</div>
        </div>

        <div className="card card--accent">
          <div className="card-title">Orders</div>
          <div className="card-value">{totals.orders}</div>
        </div>

        <div className="card card--accent">
          <div className="card-title">Products</div>
          <div className="card-value">{totals.products}</div>
        </div>

        <div className="card card--accent">
          <div className="card-title">Low Stock</div>
          <div className="card-value">{totals.lowStock}</div>
        </div>

      </div>

      <div className="dashboard-charts-row" key={renderKey}>

        <div className="chart-card">
          <div className="card-title">Weekly Revenue</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="var(--border-subtle)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--accent)"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="card-title">Orders Overview</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="var(--border-subtle)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="var(--accent)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="chart-card" style={{ marginTop: "1.5rem" }} key={renderKey + "-top"}>
        <div className="card-title">Top Products</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={topProductsData}>
            <CartesianGrid stroke="var(--border-subtle)" />
            <XAxis dataKey="name" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip />
            <Bar
              dataKey="quantity"
              fill="var(--accent-strong)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </>
  );
}
