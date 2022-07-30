import React from "react";
import "./register_Form.css";

function Register_Form() {
  return (
    <section className="register-form">
      <div className="register-form-username">
        <p>USERNAME</p>
        <input type="text" />
      </div>

      <div className="register-form-password">
        <p>PASSWORD</p>
        <input type="text" />
      </div>

      <div className="register-form-confirm-password">
        <p>CONFIRM PASSWORD</p>
        <input type="text" />
      </div>

      <div className="register-form-email">
        <p>EMAIL</p>
        <input type="text" />
      </div>

      <div className="register-form-button">
        <button>REGISTER</button>
      </div>
    </section>
  );
}

export default Register_Form;
