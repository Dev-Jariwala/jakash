import React from "react";

const Product = ({
  productIndex,
  productName,
  retailPrice,
  wholesalePrice,
  stock,
  onDelete,
  onEdit,
  productId,
}) => {
  return (
    <>
      <td>{productIndex + 1}</td>
      <td>{productName ? productName : "-"}</td>
      <td>{retailPrice ? retailPrice : "-"} Rs</td>
      <td>{wholesalePrice ? wholesalePrice : "-"} Rs</td>
      <td>{stock ? stock : "-"}</td>
      <td>
        <div className="action">
          <button onClick={() => onEdit(productId)}>Edit</button>
          <button onClick={() => onDelete(productId)}>Delete</button>
        </div>
      </td>
    </>
  );
};

export default Product;
