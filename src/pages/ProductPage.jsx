import React, { useState } from "react";
import Product from "../components/Product";
import "./ProductPage.css";
import fakeProducts from "../assets/fakeProducts";

const ProductPage = () => {
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
  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  // Calculate the index range for products based on current page
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  function handleDelete(productId) {
    setProducts((prev) =>
      prev.filter((product, productIndex) => productId !== productIndex)
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newProduct.productName.trim() !== "") {
      setProducts((prev) => {
        return [...prev, newProduct];
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
      return products.map((product, productIndex) => {
        if (productId === productIndex) {
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

    newProducts.map((product, productId) => {
      if (productId === editProduct.productId) {
        product.productName = editProduct.productName;
        product.retailPrice = editProduct.retailPrice;
        product.wholeSalePrice = editProduct.wholeSalePrice;
        product.stock = editProduct.stock;
      }
    });
    console.log(newProducts);
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
                          wholeSalePrice={product.wholeSalePrice}
                          stock={product.stock}
                          productIndex={productNumber}
                          onDelete={handleDelete}
                          onEdit={onEdit}
                        />
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="pagination">
              <div className="pagination-btns">
                <button
                  className="prev-btn"
                  onClick={() =>
                    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                >
                  Previous
                </button>
                {currentPage > 1 && (
                  <button
                    className="num-btn"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    {currentPage - 1}
                  </button>
                )}
                <button className="num-btn">{currentPage}</button>

                {currentPage < totalPages && (
                  <button
                    className="num-btn"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {currentPage + 1}
                  </button>
                )}
                {currentPage < totalPages - 1 && (
                  <button
                    className="num-btn"
                    onClick={() => setCurrentPage((prev) => prev + 2)}
                  >
                    {currentPage + 2}
                  </button>
                )}
                {currentPage < totalPages - 2 && (
                  <button
                    className="num-btn"
                    onClick={() => setCurrentPage((prev) => prev + 3)}
                  >
                    {currentPage + 3}
                  </button>
                )}
                <button
                  className="next-btn"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                >
                  Next
                </button>
              </div>
              <div className="goto">
                <input
                  type="number"
                  placeholder="Page No."
                  onChange={(e) => setGoto(Number(e.target.value))}
                  min="1"
                />
                <button
                  onClick={() => {
                    if (!goto || goto > totalPages || goto < 1) {
                      alert("Page Not Found!");
                    } else {
                      setCurrentPage(goto);
                    }
                  }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
