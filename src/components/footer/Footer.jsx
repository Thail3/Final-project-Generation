import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./footer.css";

function Footer() {
  return (
    <section>
      <div className="footer-profile-icon">
        <CgProfile />
      </div>

      <div className="footer-pagination">
        <div>
          <AiOutlineArrowLeft type="button" className="footer-arrow" />
        </div>
        <div className="footer-numberPage">
          <button>1</button>
        </div>
        <div className="footer-numberPage">
          <button>2</button>
        </div>
        <div>
          <AiOutlineArrowRight type="button" className="footer-arrow" />
        </div>
      </div>
    </section>
  );
}

export default Footer;
