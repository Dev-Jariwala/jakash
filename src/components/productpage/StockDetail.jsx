import React from "react";

const StockDetail = ({ stock, stockIndex, isAdmin, handleDelete }) => {
  const { _id, productName, costPrice, addStock, date } = stock;
  return (
    <>
      <td>{stockIndex + 1}</td>
      <td>{date}</td>
      <td>{productName}</td>
      {isAdmin && <td>{costPrice} Rs</td>}
      <td>{addStock}</td>
      <td>
        <div className="action">
          <button onClick={(e) => handleDelete(_id)} disabled={!isAdmin}>
            Delete
          </button>
        </div>
      </td>
    </>
  );
};

export default StockDetail;
