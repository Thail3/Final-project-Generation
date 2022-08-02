import React from "react";
import "./register_Form.css";

function Register_Form() {
  return (
    <section className="register-form">
      <form action="#">
      <div className="register-form-username">
        <p>USERNAME</p>
        <input type="text" pattern="\w{4,16}" title="Username must be between 4 and 16 characters." required />
      </div>

      <div className="register-form-password">
        <p>PASSWORD</p>
        <input type="text" pattern=".{8,128}"  title="Password must be at least 8 characters." required />
      </div>

      <div className="register-form-confirm-password">
        <p>CONFIRM PASSWORD</p>
        <input type="text" pattern=".{8,128}"  title="Password must be at least 8 characters." required />
      </div>

      <div className="register-form-email">
        <p>EMAIL</p>
        <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email must be a valid email." required />
      </div>

      <div className="register-form-button">
        <button>REGISTER</button>
      </div>
      </form>
    </section>
  );
}

export default Register_Form;
