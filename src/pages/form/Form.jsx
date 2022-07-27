import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormDetail from "../../components/form-component/FormDetail";
import Header from "../../components/header/Header";
import "./form.css";

function Form() {
  return (
    <div>
      <Navbar />
      <div>
        <Header />
        <FormDetail />
      </div>
    </div>
  );
}

export default Form;
