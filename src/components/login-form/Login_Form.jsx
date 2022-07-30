import React from "react";
import { Link } from "react-router-dom";
import "./login_Form.css";

function Login_Form() {
  return (
    <section className="login-form">
      <div className="login-email">
        <p>EMAIL</p>
        <input type="text" />
      </div>

      <div className="login-password">
        <p>PASSWORD</p>
        <input type="text" />
      </div>

      <div className="login-button">
        <div className="login-button-signin">
          <button>LOGIN</button>
        </div>

        <div className="login-button-register">
          <Link to="/register">
            <button>REGISTER</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login_Form;