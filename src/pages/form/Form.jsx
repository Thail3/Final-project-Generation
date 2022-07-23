import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormDetail from "../../components/form-component/FormDetail";
import "./form.css";

function Form() {
  return (
    <div>
      <Navbar />
      <div>
        <FormDetail />
      </div>
    </div>
  );
}

export default Form;
