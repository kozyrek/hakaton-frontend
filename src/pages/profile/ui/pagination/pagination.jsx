import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({ pageNumbers, currentPage, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
