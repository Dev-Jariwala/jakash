import React, { useContext } from "react";
import { StockContext } from "../../store/stockContext";
import StockDetail from "./StockDetail";
import BACKEND_URL from "../../assets/BACKEND_URL";
import axios from "axios";
import { ProductsContext } from "../../store/productContext";

const StockTable = ({ isAdmin, currentStocks, indexOfFirstStock }) => {
  const { stocks, setStocks } = useContext(StockContext);
  const { setProducts } = useContext(ProductsContext);

  async function handleDelete(stockId) {
    try {
      await axios.delete(`${BACKEND_URL}stock/delete-stock/${stockId}`);
      const response = await axios.get(`${BACKEND_URL}stock/fetch-allstocks`);
      setStocks(response.data.stocks);
      const res = await axios.get(`${BACKEND_URL}product/fetch-allProducts`);
      setProducts(res.data.products);
    } catch (error) {}
  }
  return (
    <table className="table" border="1px">
      <thead>
        <tr>
          <th>NO.</th>
          <th>Date</th>
          <th>Product Name</th>
          {<th>Cost Price</th>}
          <th>Added Stocks</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentStocks.length > 0 &&
          currentStocks.map((stock, stockIndex) => {
            const stockNumber = indexOfFirstStock + stockIndex + 1;
            return (
              <tr key={stockIndex}>
                <StockDetail
                  stock={stock}
                  isAdmin={isAdmin}
                  stockIndex={stockIndex}
                  handleDelete={handleDelete}
                  stockNumber={stockNumber}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default StockTable;
