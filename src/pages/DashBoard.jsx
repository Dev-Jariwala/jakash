import React, { useContext } from "react";
import { ThemeContext } from "../store/themeContext";

const DashBoard = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className="stock-page">
      <div className={`p-title ${darkMode ? "dark" : ""}`}>
        <h2>Dashboard Page</h2>
      </div>
    </div>
  );
};

export default DashBoard;
