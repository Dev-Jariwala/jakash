import React from "react";

const ReatilPagination = () => {
  return (
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
  );
};

export default ReatilPagination;
