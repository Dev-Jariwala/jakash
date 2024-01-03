import React, { useContext, useState } from "react";
import Modal from "../modal/Modal";
import { ProductsContext } from "../../store/productContext";
const Retail = () => {
  const [creatingBill, setCreatingBill] = useState(false);
  const { products } = useContext(ProductsContext);
  return (
    <>
      <div className="bill">
        <Modal isOpen={creatingBill} onClose={() => setCreatingBill(false)}>
          <div class="form-container bill">
            <h4>Enter Retail Bill details:</h4>
            <form>
              <div className="form-row">
                <label>
                  Bill No:
                  <input type="number" placeholder="Bill No." disabled />
                </label>
                <label>
                  Date:
                  <input type="date" placeholder="Date" />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Name:
                  <input type="text" placeholder="Name" />
                </label>
                <label>
                  Address:
                  <input type="text" placeholder="Address" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Mobile No.:
                  <input type="number" placeholder="Mobile No." value="0" />
                </label>
                <label>
                  Delivery Date:
                  <input type="date" />
                </label>
              </div>
              <div className="products-details">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Stock</th>
                      <th>Rate</th>
                      <th>Qth</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => {
                      return (
                        <tr key={prod._id}>
                          <td>
                            <input
                              type="text"
                              value={prod.productName}
                              disabled
                            />
                          </td>
                          <td>
                            {" "}
                            <input type="number" value={prod.stock} disabled />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={prod.retailPrice}
                              disabled
                            />
                          </td>
                          <td>
                            <input type="number" placeholder="Qty" />
                          </td>
                          <td>
                            {" "}
                            <input type="number" placeholder="Total" disabled />
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <button className="calculate">Calculate</button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <label>
                          Total Firki
                          <input type="text" />
                        </label>
                      </td>
                      <td>
                        <label>
                          Sub Total
                          <input type="number" disabled />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <label>
                        Discount
                        <input type="number" />
                      </label>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <label>
                        Advance
                        <input type="number" />
                      </label>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <label>
                        Total Due
                        <input type="number" />
                      </label>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit">Generate</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="table-container">
        <div className="table-head">
          <h4>Retail Bill Table : </h4>
          <button onClick={() => setCreatingBill(true)}>
            New &nbsp; Retail &nbsp; Bill
          </button>
        </div>
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
                <input type="text" placeholder="Search" />
              </form>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Bill No.</th>
                <th>Date</th>
                <th>Name</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jan 03,2024 06:00 Am</td>
                <td>Dev</td>
                <td>555/-</td>
                <td>
                  <button>Paid</button>
                </td>
                <td>
                  <button>Edit</button>
                  <button>View</button>
                  <button>Edit-Advance</button>
                  <button>Print</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jan 03,2024 06:00 Am</td>
                <td>Dev</td>
                <td>555/-</td>
                <td>
                  <button>Paid</button>
                </td>
                <td>
                  <button>Edit</button>
                  <button>View</button>
                  <button>Edit-Advance</button>
                  <button>Print</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jan 03,2024 06:00 Am</td>
                <td>Dev</td>
                <td>555/-</td>
                <td>
                  <button>Paid</button>
                </td>
                <td>
                  <button>Edit</button>
                  <button>View</button>
                  <button>Edit-Advance</button>
                  <button>Print</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Jan 03,2024 06:00 Am</td>
                <td>Dev</td>
                <td>555/-</td>
                <td>
                  <button>Paid</button>
                </td>
                <td>
                  <button>Edit</button>
                  <button>View</button>
                  <button>Edit-Advance</button>
                  <button>Print</button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Jan 03,2024 06:00 Am</td>
                <td>Dev</td>
                <td>555/-</td>
                <td>
                  <button>Paid</button>
                </td>
                <td>
                  <button>Edit</button>
                  <button>View</button>
                  <button>Edit-Advance</button>
                  <button>Print</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="pagination">
            <div className="page-navigation">
              <button className="">Previous</button>
              <button className="">1</button>
              <button className="">2</button>
              <button className="">3</button>
              <button className="">4</button>
              <button className="">5</button>
              <button className="">Next</button>
            </div>
            <div className="page-go">
              <input type="number" placeholder="Page No." min="1" />
              <button>Go</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Retail;
