import React, { useContext } from "react";
import { RetailBillContext } from "../../store/retailBillContext";
import RetailDetail from "./RetailDetail";

const RetailTable = () => {
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
          retailBills.reverse().map((bill) => {
            return <RetailDetail key={bill.BillNo} bill={bill}></RetailDetail>;
          })}
      </tbody>
    </table>
  );
};

export default RetailTable;
