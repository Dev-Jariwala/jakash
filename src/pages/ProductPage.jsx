import React, { useState } from "react";
import Product from "../components/Product";
import "./ProductPage.css";
import fakeProducts from "../assets/fakeProducts";
import ProductPagination from "../components/ProductPagination";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  // useState variables....
  const [products, setProducts] = useState(fakeProducts);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    productName: "",
    retailPrice: 0,
    wholeSalePrice: 0,
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
  function handleDelete(productId) {
    setProducts((prev) =>
      prev.filter((product) => productId !== product.productId)
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newProduct.productName.trim() !== "") {
      setProducts((prev) => {
        return [...prev, { ...newProduct, productId: Date.now() }];
      });
      setNewProduct({
        productName: "",
        retailPrice: 0,
        wholeSalePrice: 0,
        stock: 0,
      });
      setAddingProduct(() => false);
    } else {
      alert("Fill all Details correctly!");
    }
  }
  function onEdit(productId) {
    setEditingProduct(true);
    setEditProduct((prev) => {
      return products.map((product) => {
        if (productId === product.productId) {
          setEditProduct(() => {
            return {
              productId,
              productName: product.productName,
              retailPrice: product.retailPrice,
              wholeSalePrice: product.wholeSalePrice,
              stock: product.stock,
            };
          });
        }
      });
    });
  }
  function handleEdit(e) {
    e.preventDefault();

    const newProducts = [...products];

    newProducts.map((product) => {
      if (product.productId === editProduct.productId) {
        product.productName = editProduct.productName;
        product.retailPrice = editProduct.retailPrice;
        product.wholeSalePrice = editProduct.wholeSalePrice;
        product.stock = editProduct.stock;
      }
    });

    setProducts(newProducts);

    setEditingProduct(false);
  }
  return (
    <>
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
                      value={newProduct.wholeSalePrice}
                      onChange={(e) =>
                        setNewProduct((prev) => {
                          return { ...prev, wholeSalePrice: e.target.value };
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
              <form onSubmit={(e) => handleEdit(e)}>
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
                      value={editProduct.wholeSalePrice}
                      onChange={(e) =>
                        setEditProduct((prev) => {
                          return { ...prev, wholeSalePrice: e.target.value };
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
    </>
  );
};

export default ProductPage;
