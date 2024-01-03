import React, { useContext, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../store/themeContext";
// Other styled components can be defined similarly...

// Create your functional component
const SideMenu1 = ({ children }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className={`body ${darkMode ? "dark" : ""}`}>
      <nav className={`sidebar ${sidebar ? "" : "close"}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="img/logo.avif" alt="" />
            </span>

            <div className="text logo-text">
              <span className="name">Jakash</span>
              <span className="profession">patent manjo</span>
            </div>
          </div>

          <i
            className="bx bx-chevron-right toggle"
            onClick={() => setSidebar((prev) => !prev)}
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li
              className="search-box"
              onClick={() => setSidebar((prev) => !prev)}
            >
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search Ganes..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <Link to={"/"}>
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to={"/products"}>
                  <i class="material-icons icon">shopping_cart</i>
                  <span className="text nav-text">Products</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to={"/stocks"}>
                  <i class="material-icons icon">leaderboard</i>
                  <span className="text nav-text">Stocks</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to={"/bills"}>
                  <i class="material-icons icon">receipt_long</i>
                  <span className="text nav-text">Bills</span>
                </Link>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Wallets</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li
              className="mode"
              onClick={() => {
                setDarkMode((prev) => !prev);
              }}
            >
              <div className="sun-moon">
                {darkMode ? (
                  <i className="bx bx-sun icon sun"></i>
                ) : (
                  <i className="bx bx-moon icon moon"></i>
                )}
              </div>
              <span className="mode-text text">
                {darkMode ? "Light mode" : "Dark mode"}
              </span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">{children}</section>
    </div>
  );
};

export default SideMenu1;
