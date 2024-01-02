import React from "react";

const ProductDetail = ({
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
      {<td>{AvgCostPrice} Rs</td>}
      <td>{retailPrice} Rs</td>
      <td>{wholesalePrice} Rs</td>
      <td>{stock}</td>
      {<td> {totalStock} </td>}
      <td>
        <div className="action">
          <button
            className="btn-outline primary"
            onClick={() => {
              onStockAdding(productId);
            }}
          >
            Add
          </button>
          <button
            className="btn-outline success"
            onClick={() => onEdit(productId)}
          >
            Edit
          </button>
          <button
            className="btn-outline danger"
            onClick={() => onDelete(productId)}
          >
            Delete
          </button>
        </div>
      </td>
    </>
  );
};

export default ProductDetail;
