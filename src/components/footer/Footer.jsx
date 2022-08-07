import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./footer.css";
import { useGlobalContext } from "../../context/Context";

function Footer() {
  const { pageSize, totalPosts, nextPage, previousPage, handlePage } =
    useGlobalContext();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / pageSize); i++) {
    pageNumbers.push(i);
    // console.log("pageNumbers footer", pageNumbers);
  }

  return (
    <section>
      <div className="footer-profile-icon">
        <Link to="/profile">
          <CgProfile />
        </Link>
      </div>

      <div className="footer-pagination">
        <div key={previousPage} onClick={previousPage}>
          <AiOutlineArrowLeft type="button" className="footer-arrow" />
        </div>

        {pageNumbers.map((number) => {
          // console.log(number);
          return (
            <div className="footer-numberPage" key={number}>
              <button onClick={() => handlePage(number)}>{number}</button>
            </div>
          );
        })}

        <div key={nextPage} onClick={nextPage}>
          <AiOutlineArrowRight type="button" className="footer-arrow" />
        </div>
      </div>
    </section>
  );
}

export default Footer;
