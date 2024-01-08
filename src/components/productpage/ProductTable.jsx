import React from "react";
import ProductDetail from "./ProductDetail";
const ProductTable = ({
  currentProducts,
  indexOfFirstProduct,
  handleDelete,
  onEdit,
  isAdmin,
  onStockAdding,
}) => {
  return (
    <table className="table" border="1px">
      <thead>
        <tr>
          <th>NO.</th>
          <th>Product Name</th>
          <th>Retail Price</th>
          <th>Wholesale Price</th>
          <th>Stock</th>
          {<th>Total Stock</th>}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentProducts.length > 0 &&
          currentProducts.map((product, productIndex) => {
            const productNumber = indexOfFirstProduct + productIndex;
            return (
              <tr key={productIndex}>
                <ProductDetail
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
