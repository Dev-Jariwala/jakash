import React, { useContext, useState } from "react";
import Product from "../components/Product";
import "./ProductPage.css";

import ProductPagination from "../components/ProductPagination";
import ProductTable from "../components/ProductTable";
import { ProductsContext } from "../store/productContext";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

const ProductPage = () => {
  // useState variables....
  const { products, setProducts } = useContext(ProductsContext);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    productName: "",
    retailPrice: 0,
    wholesalePrice: 0,
    stock: 0,
  });
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

  // function for product crud.....
  async function handleDelete(productId) {
    try {
      await axios.delete(`${BACKEND_URL}product/delete-product/${productId}`);
      const response = await axios.get(
        `${BACKEND_URL}product/fetch-allProducts`
      );
      setProducts(response.data.products);
    } catch (error) {}
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (newProduct.productName.trim() !== "") {
        await axios.post(
          `${BACKEND_URL}product/create-product`,
          {
            ...newProduct,
          },
          { withCredentials: true }
        );
        const response = await axios.get(
          `${BACKEND_URL}product/fetch-allProducts`
        );
        setProducts(response.data.products);
        setNewProduct({
          productName: "",
          retailPrice: 0,
          wholesalePrice: 0,
          stock: 0,
        });
        setAddingProduct(() => false);
      } else {
        alert("Fill all Details correctly!");
      }
    } catch (error) {}
  }
  function onEdit(productId) {
    setEditingProduct(true);
    setEditProduct((prev) => {
      return products.map((product) => {
        if (productId === product._id) {
          setEditProduct(() => {
            return {
              _id: product._id,
              productName: product.productName,
              retailPrice: product.retailPrice,
              wholesalePrice: product.wholesalePrice,
              stock: product.stock,
            };
          });
        }
      });
    });
  }
  async function handleEdit(e, productId) {
    try {
      e.preventDefault();
      await axios.put(
        `${BACKEND_URL}product/update-product/${productId}`,
        {
          productName: editProduct.productName,
          retailPrice: editProduct.retailPrice,
          wholesalePrice: editProduct.wholesalePrice,
          stock: editProduct.stock,
        },
        { withCredentials: true }
      );

      const response = await axios.get(
        `${BACKEND_URL}product/fetch-allProducts`
      );
      setProducts(response.data.products);

      setEditingProduct(false);
    } catch (error) {}
  }
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <div className="product-page">
        <div className="p-title">
          <h2>Products Page</h2>
          <button onClick={() => setAddingProduct((prev) => !prev)}>
            {addingProduct ? "Cancle" : "New Product"}
          </button>
        </div>
        <div className="products">
          {addingProduct && (
            <div className="product-form">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="pf-title">
                  <h4>Enter Product details: </h4>
                  <button type="submit">Add Product</button>
                </div>
                <div className="f-row">
                  <label>
                    Product Name:
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.productName}
                      onChange={(e) =>
                        setNewProduct((prev) => {
                          return { ...prev, productName: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Reatil Price:
                    <input
                      type="number"
                      placeholder="Retail Price"
                      value={newProduct.retailPrice}
                      onChange={(e) =>
                        setNewProduct((prev) => {
                          return { ...prev, retailPrice: e.target.value };
                        })
                      }
                    />
                  </label>
                </div>
                <div className="f-row">
                  <label>
                    Wholesale Price:
                    <input
                      type="number"
                      placeholder="Wholesale Price"
                      value={newProduct.wholesalePrice}
                      onChange={(e) =>
                        setNewProduct((prev) => {
                          return { ...prev, wholesalePrice: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Stock:
                    <input
                      type="number"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct((prev) => {
                          return { ...prev, stock: e.target.value };
                        })
                      }
                    />
                  </label>
                </div>
              </form>
            </div>
          )}
          {editingProduct && (
            <div className="product-form">
              <form onSubmit={(e) => handleEdit(e, editProduct._id)}>
                <div className="pf-title">
                  <h4>Edit Product details: </h4>
                  <div>
                    <button type="submit">Update Product</button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setEditingProduct(false);
                      }}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
                <div className="f-row">
                  <label>
                    Product Name:
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={editProduct.productName}
                      onChange={(e) =>
                        setEditProduct((prev) => {
                          return { ...prev, productName: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Reatil Price:
                    <input
                      type="number"
                      placeholder="Retail Price"
                      value={editProduct.retailPrice}
                      onChange={(e) =>
                        setEditProduct((prev) => {
                          return { ...prev, retailPrice: e.target.value };
                        })
                      }
                    />
                  </label>
                </div>
                <div className="f-row">
                  <label>
                    Wholesale Price:
                    <input
                      type="number"
                      placeholder="Wholesale Price"
                      value={editProduct.wholesalePrice}
                      onChange={(e) =>
                        setEditProduct((prev) => {
                          return { ...prev, wholesalePrice: e.target.value };
                        })
                      }
                    />
                  </label>
                  <label>
                    Stock:
                    <input
                      type="number"
                      placeholder="Stock"
                      value={editProduct.stock}
                      onChange={(e) =>
                        setEditProduct((prev) => {
                          return { ...prev, stock: e.target.value };
                        })
                      }
                    />
                  </label>
                </div>
              </form>
            </div>
          )}
          <div className="product-table">
            <h2 style={{ textAlign: "center" }}>Product Table:</h2>
            <div className="search">
              <form>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <ProductTable
              currentProducts={currentProducts}
              indexOfFirstProduct={indexOfFirstProduct}
              handleDelete={handleDelete}
              onEdit={onEdit}
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
      </div>
    </ProductsContext.Provider>
  );
};

export default ProductPage;
