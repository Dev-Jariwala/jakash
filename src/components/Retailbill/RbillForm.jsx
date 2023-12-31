import React, { useContext } from "react";
import { ProductsContext } from "../../store/productContext";

const RbillForm = () => {
  const { products } = useContext(ProductsContext);
  console.log(products);
  return (
    <div className="rb-form">
      <form>
        <div className="cb-row">
          <label>
            Products
            <select name="" id="">
              {products.map((product) => {
                return (
                  <option key={product._id} value={product.productName}>
                    {product.productName}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </form>
    </div>
  );
};

export default RbillForm;
