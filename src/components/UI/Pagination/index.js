import React from "react";

import "./Pagination.scss";

export default function Pagination({
  totalItems,
  itemsPerPage,
  pageChange,
  currentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function changePageNumber(pageNumber) {
    pageChange(pageNumber);
  }

  function prevPage() {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      pageChange(newPage);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      pageChange(newPage);
    }
  }

  function renderPagination() {
    if (totalPages <= 5) {
      return pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => changePageNumber(pageNumber)}
          className={
            currentPage === pageNumber
              ? "pagination__button pagination__button--active"
              : "pagination__button"
          }
        >
          {pageNumber}
        </button>
      ));
    } else {
      const visiblePages = [];
      let startPage, endPage;

      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      return (
        <>
          {currentPage > 3 && <span className="pagination__ellipsis">...</span>}
          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => changePageNumber(pageNumber)}
              className={
                currentPage === pageNumber
                  ? "pagination__button pagination__button--active"
                  : "pagination__button"
              }
            >
              {pageNumber}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <span className="pagination__ellipsis">...</span>
          )}
        </>
      );
    }
  }

  return (
    <div className="pagination">
      <button
        onClick={prevPage}
        className={`pagination__button pagination__button--prev ${
          currentPage === 1 ? "pagination__button--disabled" : ""
        }`}
        disabled={currentPage === 1}
      >
        &#8592;
      </button>
      {renderPagination()}
      <button
        onClick={nextPage}
        className={`pagination__button pagination__button--next ${
          currentPage === totalPages ? "pagination__button--disabled" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        &#8594;
      </button>
    </div>
  );
}
