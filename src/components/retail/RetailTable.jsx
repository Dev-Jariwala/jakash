import React, { useContext } from "react";
import { RetailBillContext } from "../../store/retailBillContext";
import RetailDetail from "./RetailDetail";

const RetailTable = ({ onEdit }) => {
  const { retailBills } = useContext(RetailBillContext);
  //   console.log(retailBills);
  return (
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
        {retailBills &&
          retailBills.map((bill) => {
            return (
              <RetailDetail
                key={bill.BillNo}
                bill={bill}
                onEdit={onEdit}
              ></RetailDetail>
            );
          })}
      </tbody>
    </table>
  );
};

export default RetailTable;
