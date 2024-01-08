import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";

import RetailTable from "./RetailTable";
import ReatilPagination from "./ReatilPagination";
import RetailForm from "./RetailForm";
import RetailEditForm from "./RetailEditForm";
import { RetailBillContext } from "../../store/retailBillContext";
import { PDFViewer } from "@react-pdf/renderer";
import RetailBillPDF from "./RetailBillPdf";
const Retail = () => {
  const { retailBills } = useContext(RetailBillContext);
  const [creatingBill, setCreatingBill] = useState(false);
  const [editingBIll, setEditingBill] = useState(false);
  const [editRetailBill, setEditRetailBIll] = useState({
    BillNo: 0,
    orderDate: "",
    name: "",
    address: "",
    mobileNumber: "",
    deliveryDate: "",
    products: [],
    totalFirki: "",
    subTotal: 0,
    discount: 0,
    advance: 0,
    totalDue: 0,
  });
  const [showPDF, setShowPDF] = useState({
    status: false,
    bill: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  // pagination calculation
  const PAGE_SIZE = pageSize;
  const totalPages = Math.ceil(retailBills.length / PAGE_SIZE);
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const filteredProducts = retailBills.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  function onEdit(billId) {
    setEditingBill(true);
    retailBills.map((bill) => {
      if (billId === bill._id) {
        setEditRetailBIll(() => {
          return {
            _id: bill._id,
            BillNo: bill.BillNo,
            orderDate: bill.orderDate,
            name: bill.name,
            address: bill.address,
            mobileNumber: bill.mobileNumber,
            deliveryDate: bill.deliveryDate,
            products: bill.products,
            totalFirki: bill.totalFirki,
            subTotal: bill.subTotal,
            discount: bill.discount,
            advance: bill.advance,
            totalDue: bill.totalDue,
          };
        });
      }
    });
  }

  return (
    <>
      <Modal
        isOpen={showPDF.status}
        onClose={() => setShowPDF({ status: false, bill: {} })}
      >
        <PDFViewer width="1000" height="600">
          <RetailBillPDF bill={showPDF.bill} />
        </PDFViewer>
      </Modal>
      <div className="bill">
        <Modal isOpen={creatingBill} onClose={() => setCreatingBill(false)}>
          <RetailForm
            setCreatingBill={setCreatingBill}
            setShowPDF={setShowPDF}
          ></RetailForm>
        </Modal>
        <Modal isOpen={editingBIll} onClose={() => setEditingBill(false)}>
          <RetailEditForm
            setEditingBill={setEditingBill}
            editRetailBill={editRetailBill}
            setEditRetailBIll={setEditRetailBIll}
          />
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
              <select
                id="pageSize"
                onChange={(e) => setPageSize(e.target.value)}
              >
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

          <RetailTable
            onEdit={onEdit}
            currentProducts={currentProducts}
          ></RetailTable>
          <ReatilPagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
            setGoto={setGoto}
            goto={goto}
          ></ReatilPagination>
        </div>
      </div>
    </>
  );
};

export default Retail;
