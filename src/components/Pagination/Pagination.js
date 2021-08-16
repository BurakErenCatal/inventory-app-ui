import React, { useEffect, useState } from "react";

import csx from "classnames";
import s from "./Pagination.module.scss";

const Pagination = ({ totalPages, currentPage, onPageChange, className }) => {
  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    console.log("TOTAL: ", totalPages);
    let pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    setPageArray(pageArray);
  }, [totalPages]);

  return (
    <div id="pagination" className={csx(s.container, className)}>
      {pageArray.length > 0 && (
        <>
          <button
            className={csx(s.backButton, currentPage === 0 && s.disabled)}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            GERİ
          </button>
          <div className={s.pageList}>
            {pageArray.map((pageNo) => (
              <div
                key={pageNo}
                className={csx(s.pageNo, currentPage === pageNo - 1 && s.active)}
                onClick={() => onPageChange(pageNo - 1)}
              >
                {pageNo}
              </div>
            ))}
          </div>
          <button
            className={csx(s.nextButton, currentPage === pageArray.length - 1 && s.disabled)}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageArray.length - 1}
          >
            İLERİ
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
