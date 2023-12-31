import React from "react";

const Product = ({
  productIndex,
  productName,
  retailPrice,
  wholeSalePrice,
  stock,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <td>{productIndex + 1}</td>
      <td>{productName ? productName : "-"}</td>
      <td>{retailPrice ? retailPrice : "-"} Rs</td>
      <td>{wholeSalePrice ? wholeSalePrice : "-"} Rs</td>
      <td>{stock ? stock : "-"}</td>
      <td>
        <div className="action">
          <button onClick={() => onEdit(productIndex)}>Edit</button>
          <button onClick={() => onDelete(productIndex)}>Delete</button>
        </div>
      </td>
    </>
  );
};

export default Product;
