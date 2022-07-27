import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./footer.css";

function Footer() {
  return (
    <section className="footer-pagination">
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
    </section>
  );
}

export default Footer;
