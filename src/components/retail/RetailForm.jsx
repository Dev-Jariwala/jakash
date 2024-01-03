import React, { useContext, useState } from "react";
import { ProductsContext } from "../../store/productContext";
import { RetailBillContext } from "../../store/retailBillContext";
import axios from "axios";
import BACKEND_URL from "../../assets/BACKEND_URL";
const RetailForm = ({ setCreatingBill }) => {
  const { products } = useContext(ProductsContext);
  const { retailBills, setRetailBIlls } = useContext(RetailBillContext);
  const [newRetailBill, setNewRetailBill] = useState({
    BillNo: retailBills.length + 1,
    orderDate: undefined,
    name: "",
    address: "",
    mobileNumber: undefined,
    deliveryDate: undefined,
    products: [],
    totalFirki: undefined,
    subTotal: 0,
    discount: undefined,
    advance: undefined,
    totalDue: undefined,
  });
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.post(
        `${BACKEND_URL}retail/create-retailbill`,
        {
          ...newRetailBill,
        },
        { withCredentials: true }
      );
      const response = await axios.get(
        `${BACKEND_URL}retail/fetch-allRetailbills`
      );
      setRetailBIlls(response.data.retailBills);
      setNewRetailBill({
        BillNo: retailBills.length + 1,
        orderDate: null,
        name: "",
        address: "",
        mobileNumber: null,
        deliveryDate: null,
        products: [],
        totalFirki: null,
        subTotal: 0,
        discount: null,
        advance: null,
        totalDue: null,
      });
      setCreatingBill(false);
    } catch (error) {}
  }
  return (
    <div className="form-container bill">
      <h4>Enter Retail Bill details:</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <label>
            Bill No:
            <input
              type="number"
              placeholder="Bill No."
              value={newRetailBill.BillNo}
              disabled
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              placeholder="Date"
              value={newRetailBill.orderDate}
              onChange={(e) =>
                setNewRetailBill((prev) => {
                  return { ...prev, orderDate: e.target.value };
                })
              }
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Name:
            <input
              type="text"
              placeholder="Name"
              value={newRetailBill.name}
              onChange={(e) =>
                setNewRetailBill((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              placeholder="Address"
              value={newRetailBill.address}
              onChange={(e) =>
                setNewRetailBill((prev) => {
                  return { ...prev, address: e.target.value };
                })
              }
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Mobile No.:
            <input
              type="number"
              placeholder="Mobile No."
              value={newRetailBill.mobileNo}
              onChange={(e) =>
                setNewRetailBill((prev) => {
                  return { ...prev, mobileNumber: Number(e.target.value) };
                })
              }
              required
            />
          </label>
          <label>
            Delivery Date:
            <input
              type="date"
              value={newRetailBill.deliveryDate}
              onChange={(e) =>
                setNewRetailBill((prev) => {
                  return { ...prev, deliveryDate: e.target.value };
                })
              }
              required
            />
          </label>
        </div>
        <div className="products-details">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                return (
                  <tr key={prod._id}>
                    <td>
                      <input type="text" value={prod.productName} disabled />
                    </td>
                    <td>
                      {" "}
                      <input type="number" value={prod.stock} disabled />
                    </td>
                    <td>
                      <input type="number" value={prod.retailPrice} disabled />
                    </td>
                    <td>
                      {prod.stock > 0 ? (
                        <input
                          type="number"
                          placeholder="Qty"
                          min="0"
                          onChange={(e) => {
                            const newQty = Number(e.target.value);
                            if (newQty >= 0) {
                              setNewRetailBill((prev) => {
                                const updatedProducts = prev.products.map(
                                  (product) => {
                                    if (product.productId === prod._id) {
                                      return {
                                        ...product,
                                        quantity: newQty,
                                      };
                                    }
                                    return product;
                                  }
                                );

                                const existingProduct = updatedProducts.find(
                                  (product) => product.productId === prod._id
                                );
                                if (!existingProduct) {
                                  updatedProducts.push({
                                    productId: prod._id,
                                    productName: prod.productName,
                                    price: prod.retailPrice,
                                    quantity: newQty,
                                  });
                                }

                                return {
                                  ...prev,
                                  products: updatedProducts,
                                  subTotal: updatedProducts.reduce(
                                    (acc, curr) =>
                                      acc + curr.price * curr.quantity,
                                    0
                                  ),
                                };
                              });
                            }
                          }}
                        />
                      ) : (
                        <input
                          style={{ textAlign: "center" }}
                          type="text"
                          value={"Out of Stock"}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        placeholder="Total"
                        value={
                          prod.retailPrice *
                            newRetailBill.products.find(
                              (p) => p.productId === prod._id
                            )?.quantity || 0
                        }
                        disabled
                      />
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let totalQty = newRetailBill.products.reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                      );
                      setNewRetailBill((prev) => {
                        return { ...prev, totalFirki: totalQty };
                      });
                    }}
                    className="calculate"
                  >
                    Calculate
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <label>
                    Total Firki
                    <input
                      type="number"
                      value={newRetailBill.totalFirki}
                      onChange={(e) => {
                        setNewRetailBill((prev) => {
                          return {
                            ...prev,
                            totalFirki: Number(e.target.value),
                          };
                        });
                      }}
                      required
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Sub Total
                    <input
                      type="number"
                      value={newRetailBill.subTotal}
                      disabled
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {" "}
                  <label>
                    Discount
                    <input
                      type="number"
                      value={newRetailBill.discount}
                      onChange={(e) =>
                        setNewRetailBill((prev) => {
                          return {
                            ...prev,
                            discount: Number(e.target.value),
                            subTotal: Number(
                              prev.products.reduce(
                                (acc, curr) => acc + curr.price * curr.quantity,
                                0
                              ) - Number(e.target.value)
                            ),
                          };
                        })
                      }
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <label>
                    Advance
                    <input
                      type="number"
                      value={newRetailBill.advance}
                      onChange={(e) =>
                        setNewRetailBill((prev) => {
                          return {
                            ...prev,
                            advance: Number(e.target.value),
                            totalDue: Number(
                              prev.subTotal - Number(e.target.value)
                            ),
                          };
                        })
                      }
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <label>
                    Total Due
                    <input
                      type="number"
                      value={newRetailBill.totalDue}
                      onChange={(e) =>
                        setNewRetailBill((prev) => {
                          return {
                            ...prev,
                            totalDue: Number(e.target.value),
                            advance: Number(
                              prev.subTotal - Number(e.target.value)
                            ),
                          };
                        })
                      }
                      required
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Generate</button>
        </div>
      </form>
    </div>
  );
};

export default RetailForm;
