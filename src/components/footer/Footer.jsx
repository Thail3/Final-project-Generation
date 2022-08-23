import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./footer.css";
import { useGlobalContext } from "../../context/Context";
import { usePagination, DOTS } from "./usePagination";

function Footer() {
  const { pageSize, totalActivities, pageNumber, setPageNumber } =
    useGlobalContext();
  console.log("totalActivities", totalActivities);
  console.log("pageSize", pageSize);
  console.log("pageNumber", pageNumber);

  const paginationRange = usePagination({
    totalActivities: totalActivities,
    pageSize: pageSize,
    siblingCount: 1,
    pageNumber: pageNumber,
  });
  console.log("paginationRange", paginationRange);

  const handleClickNext = () => {
    if (pageNumber >= paginationRange.length) {
      setPageNumber(paginationRange.length);
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleClickBack = () => {
    if (pageNumber <= 1) {
      setPageNumber(1);
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <section>
      <div className="footer-profile-icon">
        <Link to="/profile">
          <CgProfile />
        </Link>
      </div>

      <div className="footer-pagination">
        <div
          onClick={handleClickBack}
          key={handleClickBack}
          // className={{ disabled: pageNumber === 1 }}
        >
          <AiOutlineArrowLeft type="button" className="footer-arrow" />
        </div>

        {paginationRange?.map((pageNum) => {
          if (pageNum === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }
          return (
            <div className="footer-numberPage" key={pageNum}>
              <button onClick={() => setPageNumber(pageNum)}>{pageNum}</button>
            </div>
          );
        })}

        <div
          onClick={handleClickNext}
          key={handleClickNext}
          // className={{ disabled: pageNumber === lastPage }}
        >
          <AiOutlineArrowRight type="button" className="footer-arrow" />
        </div>
      </div>
    </section>
  );
}

export default Footer;
