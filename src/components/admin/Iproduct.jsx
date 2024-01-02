import React from "react";

const Iproduct = ({ productIndex, product }) => {
  const { productName, AvgCostPrice, stock, totalStock } = product;
  return (
    <>
      <td>{productIndex + 1}</td>
      <td>{productName}</td>
      <td>{AvgCostPrice} Rs</td>
      <td>{stock}</td>
      <td> {totalStock} </td>
      <td>{AvgCostPrice * totalStock}</td>
      <td>0</td>
    </>
  );
};

export default Iproduct;
