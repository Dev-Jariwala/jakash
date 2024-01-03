import React, { useState } from "react";
import Retail from "../components/retail/Retail";
import WholeSale from "../components/wholesale/WholeSale";
import "./BIll.css";
const BillsPage = () => {
  const [bill, setBill] = useState("retail");
  return (
    <div className="Bill-Page">
      <div className="p-title">
        <h2>Bills</h2>
      </div>
      <div className="bill-toggle">
        <h2
          className={bill === "retail" ? "active" : ""}
          onClick={() => setBill("retail")}
        >
          Retail Bill
        </h2>
        <h2
          className={bill === "wholesale" ? "active" : ""}
          onClick={() => setBill("wholesale")}
        >
          WholeSale Bill
        </h2>
      </div>

      <div className="bill-content">
        {bill === "retail" ? <Retail /> : <WholeSale />}
      </div>
    </div>
  );
};

export default BillsPage;
