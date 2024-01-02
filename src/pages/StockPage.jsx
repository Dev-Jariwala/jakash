import React, { useContext } from "react";
import Stock from "../components/stockPage/Stock";
import { ThemeContext } from "../store/themeContext";
const StockPage = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className="product-page">
      <div className={`p-title ${darkMode ? "dark" : ""}`}>
        <h2>Stock Page</h2>
      </div>
      <Stock></Stock>
    </div>
  );
};

export default StockPage;
