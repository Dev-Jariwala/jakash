import React from "react";

const Product = ({
  productIndex,
  product,
  onDelete,
  onEdit,
  productId,
  isAdmin,
}) => {
  const { productName, costPrice, retailPrice, wholesalePrice, stock } =
    product;
  return (
    <>
      <td>{productIndex + 1}</td>
      <td>{productName ? productName : "-"}</td>
      {isAdmin && <td>{costPrice ? costPrice : "-"} Rs</td>}
      <td>{retailPrice ? retailPrice : "-"} Rs</td>
      <td>{wholesalePrice ? wholesalePrice : "-"} Rs</td>
      <td>{stock ? stock : "-"}</td>
      <td>
        <div className="action">
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
