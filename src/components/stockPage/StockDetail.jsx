import React from "react";

const StockDetail = ({
  stock,
  stockIndex,
  isAdmin,
  handleDelete,
  stockNumber,
}) => {
  const { _id, productName, costPrice, addStock, date } = stock;
  function convertToReadableDate(dateTimeString) {
    const date = new Date(dateTimeString);

    const optionsDate = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  }

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
