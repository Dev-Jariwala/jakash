import React from "react";

const Product = ({
  productIndex,
  product,
  onDelete,
  onEdit,
  productId,
  isAdmin,
  onStockAdding,
}) => {
  const {
    productName,
    retailPrice,
    wholesalePrice,
    stock,
    totalStock,
    AvgCostPrice,
  } = product;
  return (
    <>
      <td>{productIndex + 1}</td>
      <td>{productName ? productName : "-"}</td>
      {isAdmin && <td>{AvgCostPrice} Rs</td>}
      <td>{retailPrice} Rs</td>
      <td>{wholesalePrice} Rs</td>
      <td>{stock}</td>
      {isAdmin && <td> {totalStock} </td>}
      <td>
        <div className="action">
          <button
            onClick={() => {
              onStockAdding(productId);
            }}
          >
            Add
          </button>
          <button onClick={() => onEdit(productId)} disabled={!isAdmin}>
            Edit
          </button>
          <button onClick={() => onDelete(productId)} disabled={!isAdmin}>
            Delete
          </button>
        </div>
      </td>
    </>
  );
};

export default Product;
