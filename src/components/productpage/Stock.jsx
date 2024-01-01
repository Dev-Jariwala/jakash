import React, { useContext, useState } from "react";
import StockTable from "./StockTable";
// import { StockContext } from "../../store/stockContext";

const Stock = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  //   const { stocks, setStocks } = useContext(StockContext);
  return (
    <div className="product-table">
      <h2 style={{ textAlign: "center" }}>Stock Management Table:</h2>
      <div className="search">
        <button
          onClick={() => {
            if (isAdmin) {
              setIsAdmin(false);
            } else {
              const adminpass = "jakash@123";
              const enteredpass = prompt("Enter password");
              if (adminpass === enteredpass) {
                setIsAdmin(true);
              } else {
                alert("Invalid Pass");
              }
            }
          }}
        >
          {isAdmin ? "Done" : "Admin"}
        </button>
        <form>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <StockTable isAdmin={isAdmin}></StockTable>
    </div>
  );
};

export default Stock;
