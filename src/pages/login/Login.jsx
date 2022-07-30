import React from "react";
import Login_Form from "../../components/login-form/Login_Form";
import "./login.css";
import "./login.scss";

function login() {
  return (
    <div className="login-page">
      <Login_Form />
      <div className="snow"></div>
    </div>
  );
}

export default login;
