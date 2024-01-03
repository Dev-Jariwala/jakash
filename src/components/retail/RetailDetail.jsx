import React from "react";
import { convertToReadableDate } from "../../assets/helper";

const RetailDetail = ({ bill }) => {
  const { BillNo, orderDate, name, subTotal, totalDue } = bill;
  return (
    <tr>
      <td>{BillNo}</td>
      <td>{convertToReadableDate(orderDate)}</td>
      <td>{name}</td>
      <td>{subTotal}/-</td>
      <td>
        <button
          className={`btn-outline ${totalDue > 0 ? "danger" : "success"}`}
        >
          {totalDue > 0 ? totalDue : "Paid"}
        </button>
      </td>
      <td>
        <button>Edit</button>
        <button>View</button>
        <button>Edit-Advance</button>
        <button>Print</button>
      </td>
    </tr>
  );
};

export default RetailDetail;
