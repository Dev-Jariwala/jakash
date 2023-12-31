import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [activePage, setActivePage] = useState("products");
  return (
    <div className="navbar">
      <div className="brandname">Jakash</div>
      <ul>
        <Link to={"/products"}>
          <li
            className={`${activePage === "products" ? "activepage" : ""}`}
            onClick={() => setActivePage("products")}
          >
            Products
          </li>
        </Link>
        <Link to={"/retailbill"}>
          <li
            className={`${activePage === "retailbill" ? "activepage" : ""}`}
            onClick={() => setActivePage("retailbill")}
          >
            Retail Bill
          </li>
        </Link>
        <Link to={"/wholesalebill"}>
          <li
            className={`${activePage === "wholesalebill" ? "activepage" : ""}`}
            onClick={() => setActivePage("wholesalebill")}
          >
            WholeSale Bill
          </li>
        </Link>
        <Link to={"/admin"}>
          <li
            className={`${activePage === "admin" ? "activepage" : ""}`}
            onClick={() => setActivePage("admin")}
          >
            Admin
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
