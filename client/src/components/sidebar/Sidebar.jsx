import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-brand">
          <div className="sidebar-logo">SM</div>
          <div>
            <div className="sidebar-title-main">Store Manager</div>
            <div className="sidebar-title-sub">Admin Dashboard</div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" end className="sidebar-link">
            <div className="sidebar-link-icon"><FiHome /></div>
            Dashboard
          </NavLink>

          <NavLink to="/products" className="sidebar-link">
            <div className="sidebar-link-icon"><FiPackage /></div>
            Products
          </NavLink>

          <NavLink to="/orders" className="sidebar-link">
            <div className="sidebar-link-icon"><FiShoppingCart /></div>
            Orders
          </NavLink>

          <NavLink to="/customers" className="sidebar-link">
            <div className="sidebar-link-icon"><FiUsers /></div>
            Customers
          </NavLink>
        </nav>

        <div className="sidebar-footer">Store Manager UI © {new Date().getFullYear()}</div>
      </div>
    </aside>
  );
}
