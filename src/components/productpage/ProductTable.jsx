import React from "react";
import Product from "./Product";

const ProductTable = ({
  currentProducts,
  indexOfFirstProduct,
  handleDelete,
  onEdit,
  isAdmin,
  onStockAdding,
}) => {
  return (
    <table border="1px">
      <thead>
        <tr>
          <th>NO.</th>
          <th>Product Name</th>
          {isAdmin && <th>Avg. Cost Price</th>}
          <th>Retail Price</th>
          <th>Wholesale Price</th>
          <th>Stock</th>
          {isAdmin && <th>Total Stock</th>}
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
                  product={product}
                  productIndex={productNumber}
                  onDelete={handleDelete}
                  onEdit={onEdit}
                  productId={product._id}
                  isAdmin={isAdmin}
                  onStockAdding={onStockAdding}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default ProductTable;
