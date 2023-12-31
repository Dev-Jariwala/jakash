import React from "react";
import Product from "./Product";

const ProductTable = ({
  currentProducts,
  indexOfFirstProduct,
  handleDelete,
  onEdit,
}) => {
  return (
    <table border="1px">
      <thead>
        <tr>
          <th>NO.</th>
          <th>Product Name</th>
          <th>Retail Price</th>
          <th>Wholesale Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentProducts.length > 0 &&
          currentProducts.map((product, productIndex) => {
            const productNumber = indexOfFirstProduct + productIndex;
            return (
              <tr key={productIndex}>
                <Product
                  productName={product.productName}
                  retailPrice={product.retailPrice}
                  wholesalePrice={product.wholesalePrice}
                  stock={product.stock}
                  productIndex={productNumber}
                  onDelete={handleDelete}
                  onEdit={onEdit}
                  productId={product._id}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default ProductTable;
