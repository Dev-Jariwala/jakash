import React, { useContext, useState } from "react";
import Product from "../components/productpage/Product";
import "./ProductPage.css";
import { ProductsContext } from "../store/productContext";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
import { StockContext } from "../store/stockContext";
import "./table.css";
import { ThemeContext } from "../store/themeContext";

const ProductPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { products, setProducts } = useContext(ProductsContext);
  const { setStocks } = useContext(StockContext);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [editProduct, setEditProduct] = useState({
    _id: "",
    productName: "",
    addStock: 0,
    costPrice: 0,
  });
  const [newProduct, setNewProduct] = useState({
    productName: "",
    retailPrice: 0,
    wholesalePrice: 0,
  });

  const [addingStock, setAddingStock] = useState(false);
  const [stockForm, setStockForm] = useState({});

  // function for product crud.....

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
            };
          });
        }
      });
    });
  }
  function onStockAdding(productId) {
    setAddingStock(true);
    products.map((product) => {
      if (productId === product._id) {
        setStockForm(() => {
          return {
            _id: product._id,
            productName: product.productName,
          };
        });
      }
    });
  }
  async function handleStock(e, productId) {
    try {
      e.preventDefault();
      await axios.post(
        `${BACKEND_URL}stock/add-stock/${productId}`,
        {
          productName: stockForm.productName,
          date: stockForm.date,
          costPrice: Number(stockForm.costPrice),
          addStock: Number(stockForm.addStock),
        },
        { withCredentials: true }
      );

      const response = await axios.get(
        `${BACKEND_URL}product/fetch-allProducts`
      );
      setProducts(response.data.products);
      const res = await axios.get(`${BACKEND_URL}stock/fetch-allStocks`);
      setStocks(res.data.stocks);

      setAddingStock(false);
    } catch (error) {}
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
    <div className="product-page">
      <div className={`p-title ${darkMode ? "dark" : ""}`}>
        <h2>Products Page</h2>
        <button onClick={() => setAddingProduct((prev) => !prev)}>
          {addingProduct ? "Cancle" : "New Product"}
        </button>
      </div>

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
                  value={0}
                  readOnly={true}
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
                  readOnly={true}
                />
              </label>
            </div>
          </form>
        </div>
      )}
      {addingStock && (
        <div className="product-form">
          <form
            onSubmit={(e) => {
              handleStock(e, stockForm._id);
            }}
          >
            <div className="pf-title">
              <h4>Add Stock in product: </h4>
              <div>
                <button type="submit">Add Stock</button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setAddingStock(false);
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
                  value={stockForm.productName}
                />
              </label>
              <label>
                Cost Price:
                <input
                  type="number"
                  placeholder="Cost Price"
                  value={stockForm.costPrice}
                  onChange={(e) =>
                    setStockForm((prev) => {
                      return { ...prev, costPrice: e.target.value };
                    })
                  }
                />
              </label>
            </div>
            <div className="f-row">
              <label>
                Stock:
                <input
                  type="number"
                  placeholder="Stock"
                  value={stockForm.addStock}
                  onChange={(e) =>
                    setStockForm((prev) => {
                      return { ...prev, addStock: e.target.value };
                    })
                  }
                />
              </label>
              <label>
                Date:
                <input type="date" value={stockForm.date} />
              </label>
            </div>
          </form>
        </div>
      )}
      <Product
        products={products}
        setProducts={setProducts}
        onEdit={onEdit}
        onStockAdding={onStockAdding}
      />
    </div>
  );
};

export default ProductPage;
