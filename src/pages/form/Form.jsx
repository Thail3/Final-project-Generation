import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormDetail from "../../components/form-component/FormDetail";
import Header from "../../components/header/Header";
import "./form.css";

function Form() {
  return (
    <div className="form-page">
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="form-page">
        <Navbar />
        <div>
          <Header />
          <FormDetail />
        </div>
      </div>
    </div>
  );
}

export default Form;
