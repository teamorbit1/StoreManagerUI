import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <div className="app-navbar">
          <Navbar />
          <div className="navbar-accent-bar"></div>
        </div>

        <div className="app-content">
          <div className="app-content-inner page-transition-container">
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.pathname}
                timeout={350}
                classNames={{
                  enter: "page-transition-enter",
                  enterActive: "page-transition-enter-active",
                  exit: "page-transition-exit",
                  exitActive: "page-transition-exit-active",
                }}
                unmountOnExit
              >
                <div className="page-transition-wrapper">
                  <Routes location={location}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                  </Routes>
                </div>
              </CSSTransition>
            </TransitionGroup>

          </div>
        </div>
      </div>
    </div>
  );
}
