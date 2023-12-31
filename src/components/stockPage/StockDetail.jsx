import React from "react";
import { convertToReadableDate } from "../../assets/helper";

const StockDetail = ({
  stock,
  stockIndex,
  isAdmin,
  handleDelete,
  onEdit,
  stockNumber,
}) => {
  const { _id, productName, addStock, date } = stock;

  return (
    <>
      <td>{stockNumber}</td>
      <td>{convertToReadableDate(date)}</td>
      <td>{productName}</td>
      <td>{addStock}</td>
      <td>
        <div className="action">
          <button
            className="btn-outline success"
            onClick={(e) => onEdit(stock)}
          >
            Edit
          </button>
          <button
            className="btn-outline danger"
            onClick={(e) => handleDelete(_id)}
          >
            Delete
          </button>
        </div>
      </td>
    </>
  );
};

export default StockDetail;
