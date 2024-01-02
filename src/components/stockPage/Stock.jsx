import React, { useContext, useState } from "react";
import StockTable from "./StockTable";
import { StockContext } from "../../store/stockContext";
import StockPagination from "./StockPagination";

const Stock = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { stocks, setStocks } = useContext(StockContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState(currentPage);

  // pagination calculation
  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(stocks.length / PAGE_SIZE);
  const indexOfLastStock = currentPage * PAGE_SIZE;
  const indexOfFirstStock = indexOfLastStock - PAGE_SIZE;
  const filteredStocks = stocks.filter((stock) =>
    Object.values(stock).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentStocks = filteredStocks.slice(
    indexOfFirstStock,
    indexOfLastStock
  );
  return (
    <div className="table-container">
      <div className="table-head">Stock Table :</div>
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
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <StockTable
          isAdmin={isAdmin}
          currentStocks={currentStocks}
          indexOfFirstStock={indexOfFirstStock}
        ></StockTable>
        <StockPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          goto={goto}
          setGoto={setGoto}
          totalPages={totalPages}
        ></StockPagination>
      </div>
    </div>
  );
};

export default Stock;
