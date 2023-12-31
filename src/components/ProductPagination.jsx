import React from "react";

const ProductPagination = ({
  setCurrentPage,
  currentPage,
  totalPages,
  setGoto,
  goto,
}) => {
  return (
    <div className="pagination">
      <div className="pagination-btns">
        <button
          className="prev-btn"
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </button>
        {currentPage > 1 && (
          <button
            className="num-btn"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button className="num-btn">{currentPage}</button>

        {currentPage < totalPages && (
          <button
            className="num-btn"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button
            className="num-btn"
            onClick={() => setCurrentPage((prev) => prev + 2)}
          >
            {currentPage + 2}
          </button>
        )}
        {currentPage < totalPages - 2 && (
          <button
            className="num-btn"
            onClick={() => setCurrentPage((prev) => prev + 3)}
          >
            {currentPage + 3}
          </button>
        )}
        <button
          className="next-btn"
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
        >
          Next
        </button>
      </div>
      <div className="goto">
        <input
          type="number"
          placeholder="Page No."
          onChange={(e) => setGoto(Number(e.target.value))}
          min="1"
        />
        <button
          onClick={() => {
            if (!goto || goto > totalPages || goto < 1) {
              alert("Page Not Found!");
            } else {
              setCurrentPage(goto);
            }
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;
