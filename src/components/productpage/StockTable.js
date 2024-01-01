import React, { useContext } from "react";
import { StockContext } from "../../store/stockContext";
import StockDetail from "./StockDetail";
import BACKEND_URL from "../../assets/BACKEND_URL";
import axios from "axios";

const StockTable = ({ isAdmin }) => {
  const { stocks, setStocks } = useContext(StockContext);

  async function handleDelete(stockId) {
    try {
      await axios.delete(`${BACKEND_URL}stock/delete-stock/${stockId}`);
      const response = await axios.get(`${BACKEND_URL}stock/fetch-allstocks`);
      setStocks(response.data.stocks);
    } catch (error) {}
  }
  return (
    <table border="1px">
      <thead>
        <tr>
          <th>NO.</th>
          <th>Date</th>
          <th>Product Name</th>
          {isAdmin && <th>Cost Price</th>}
          <th>Added Stocks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {stocks.length > 0 &&
          stocks.map((stock, stockIndex) => {
            return (
              <tr key={stockIndex}>
                <StockDetail
                  stock={stock}
                  isAdmin={isAdmin}
                  stockIndex={stockIndex}
                  handleDelete={handleDelete}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default StockTable;
