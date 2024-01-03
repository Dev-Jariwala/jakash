import React, { useContext, useState } from "react";
import Modal from "../modal/Modal";

import RetailTable from "./RetailTable";
import ReatilPagination from "./ReatilPagination";
import RetailForm from "./RetailForm";
const Retail = () => {
  const [creatingBill, setCreatingBill] = useState(false);
  return (
    <>
      <div className="bill">
        <Modal isOpen={creatingBill} onClose={() => setCreatingBill(false)}>
          <RetailForm setCreatingBill={setCreatingBill}></RetailForm>
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

          <RetailTable></RetailTable>
          <ReatilPagination></ReatilPagination>
        </div>
      </div>
    </>
  );
};

export default Retail;
