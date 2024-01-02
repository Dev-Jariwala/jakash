import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/productContext";
import Iproduct from "../components/admin/Iproduct";

const AdminPage = () => {
  const { products } = useContext(ProductsContext);
  const [investedProducts, setInvestedProducts] = useState([]);

  useEffect(() => {
    setInvestedProducts(() =>
      products.filter((product) => {
        return product.totalStock > 0;
      })
    );
  }, [products]);

  return (
    <>
      <div className="product-table">
        <table border="1px">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Product Name</th>
              {<th>Avg Cost Price</th>}
              <th>Stock</th>
              <th>Total Stock</th>
              <th>Invested Amount</th>
              <th>PNL</th>
            </tr>
          </thead>
          <tbody>
            {investedProducts.length > 0 &&
              investedProducts.map((product, productIndex) => {
                const productNumber = productIndex + 1;
                return (
                  <tr key={productIndex}>
                    <Iproduct
                      product={product}
                      productIndex={productIndex}
                    ></Iproduct>
                  </tr>
                );
              })}
            <td>Total</td>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
