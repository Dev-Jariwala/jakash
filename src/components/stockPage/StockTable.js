import React, { useContext, useState } from "react";
import { StockContext } from "../../store/stockContext";
import StockDetail from "./StockDetail";
import BACKEND_URL from "../../assets/BACKEND_URL";
import axios from "axios";
import { ProductsContext } from "../../store/productContext";
import Modal from "../modal/Modal";

const StockTable = ({ isAdmin, currentStocks, indexOfFirstStock }) => {
  const { stocks, setStocks } = useContext(StockContext);
  const { setProducts } = useContext(ProductsContext);
  const [editingStock, setEditingStock] = useState({
    status: false,
    formData: {},
  });

  async function handleDelete(stockId) {
    try {
      await axios.delete(`${BACKEND_URL}stock/delete-stock/${stockId}`);
      const response = await axios.get(`${BACKEND_URL}stock/fetch-allstocks`);
      setStocks(response.data.stocks.reverse());
      const res = await axios.get(`${BACKEND_URL}product/fetch-allProducts`);
      setProducts(res.data.products);
    } catch (error) {}
  }
  async function handleEdit(e, stockId) {
    e.preventDefault();
    try {
      if (editingStock.formData.addStock < 0) {
        alert("negative values not allowed!");
      } else {
        await axios.put(
          `${BACKEND_URL}stock/update-stock/${stockId}`,
          {
            addStock: editingStock.formData.addStock,
            date: editingStock.formData.date,
          },
          {
            withCredentials: true,
          }
        );
        const response = await axios.get(`${BACKEND_URL}stock/fetch-allstocks`);
        setStocks(response.data.stocks.reverse());
        const res = await axios.get(`${BACKEND_URL}product/fetch-allProducts`);
        setProducts(res.data.products);
        setEditingStock({ status: false, formData: {} });
      }
    } catch (error) {}
  }
  function onEdit(stock) {
    setEditingStock((prev) => {
      return { ...prev, status: true, formData: stock };
    });
  }
  return (
    <>
      <Modal
        isOpen={editingStock.status}
        onClose={() => setEditingStock({ status: false, formData: {} })}
      >
        <div className="form-container">
          <form
            onSubmit={(e) => {
              handleEdit(e, editingStock.formData._id);
            }}
          >
            <h4>Add Stock in product: </h4>
            <div>
              <label>
                Product Name:
                <input
                  type="text"
                  placeholder="Product Name"
                  value={editingStock.formData.productName}
                  disabled
                />
              </label>
            </div>
            <div>
              <label>
                Stock:
                <input
                  type="number"
                  placeholder="Stock"
                  value={editingStock.formData?.addStock}
                  onChange={(e) => {
                    setEditingStock((prev) => {
                      return {
                        ...prev,
                        formData: {
                          ...prev.formData,
                          addStock: parseFloat(e.target.value),
                        },
                      };
                    });
                  }}
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={editingStock.formData?.date?.slice(0, 10)}
                  onChange={(e) =>
                    setEditingStock((prev) => {
                      return {
                        ...prev,
                        formData: { ...prev.formData, date: e.target.value },
                      };
                    })
                  }
                />
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit">Add Stock</button>
            </div>
          </form>
        </div>
      </Modal>
      <table className="table" border="1px">
        <thead>
          <tr>
            <th>NO.</th>
            <th>Date</th>
            <th>Product Name</th>
            <th>Added Stocks</th>
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
                    onEdit={onEdit}
                  />
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default StockTable;
