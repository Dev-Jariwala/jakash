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
    bill: {
      BillNo: 1,
      orderDate: "2024-01-08T00:00:00.000+00:00",
      name: "Dev Jariwala",
      address: "26 Laxmi krupa society",
      mobileNumber: 7990176865,
      deliveryDate: "2024-01-10T00:00:00.000+00:00",

      products: [
        {
          productId: "659ac30338978688ef38a588",
          productName: "Firki 1",
          quantity: 1,
          price: 500,
          _id: "659b844fd1e44a9aa826e775",
        },
        {
          productId: "659ac31138978688ef38a58b",
          productName: "Firki 2",
          quantity: 1,
          price: 400,
          _id: "659b844fd1e44a9aa826e776",
        },
      ],
      totalFirki: 2,
      subTotal: 900,
      discount: 0,
      advance: 0,
      totalDue: 900,
    },
  });

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

          <RetailTable onEdit={onEdit}></RetailTable>
          <ReatilPagination></ReatilPagination>
        </div>
      </div>
    </>
  );
};

export default Retail;
