import React from "react";
import { convertToReadableDate } from "../../assets/helper";

const StockDetail = ({
  stock,
  stockIndex,
  isAdmin,
  handleDelete,
  stockNumber,
}) => {
  const { _id, productName, costPrice, addStock, date } = stock;

  return (
    <>
      <td>{stockNumber}</td>
      <td>{convertToReadableDate(date)}</td>
      <td>{productName}</td>
      {<td>{costPrice} Rs</td>}
      <td>{addStock}</td>
      {<td>{costPrice * addStock}</td>}
      <td>
        <div className="action">
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
