import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { RiSunFill } from "react-icons/ri";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="app-navbar navbar--styled">
      <div className="navbar-inner">
        <div className="navbar-left">
          <div className="navbar-title">Dashboard</div>
          <div className="navbar-subtitle">Store Overview</div>
        </div>

        <div className="navbar-right">
          <button
            className="btn btn-ghost navbar-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <FiSun size={17} />: <RiSunFill size={17} />}
          </button>
          <div className="navbar-profile circle-btn">
            <FiUser size={17} />
          </div>
        </div>
      </div>

      <div className="navbar-accent-bar"></div>
    </header>
  );
}
