import React, { useState } from "react";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import axios from "axios";
import BACKEND_URL from "../../assets/BACKEND_URL";

const Product = ({ products, setProducts, onEdit, onStockAdding }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  // pagination calculation
  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  async function handleDelete(productId) {
    try {
      await axios.delete(`${BACKEND_URL}product/delete-product/${productId}`);
      const response = await axios.get(
        `${BACKEND_URL}product/fetch-allProducts`
      );
      setProducts(response.data.products);
    } catch (error) {}
  }
  return (
    <div className="table-container">
      <div className="table-head">Product Table : </div>
      <div className="table-content">
        <div className="table-features">
          <div className="page-size-dropdown">
            <select id="pageSize">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="search-bar">
            <form>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <ProductTable
          currentProducts={currentProducts}
          indexOfFirstProduct={indexOfFirstProduct}
          handleDelete={handleDelete}
          onEdit={onEdit}
          onStockAdding={onStockAdding}
        />
        <ProductPagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setGoto={setGoto}
          goto={goto}
        ></ProductPagination>
      </div>
    </div>
  );
};

export default Product;
