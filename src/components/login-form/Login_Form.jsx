import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./login_Form.css";
import axios from "axios";
import { useGlobalContext } from "../../context/Context";

function Login_Form() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { url } = useGlobalContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const login = async () => {
    try {
      const res = await axios.post(url + "/auth", formValues);
      const data = res.data;
      localStorage.setItem("token", data.token);
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFormErrors({ ...formErrors, response: error.response.data.message });
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      login();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    }
    return errors;
  };

  return (
    <Form className="login-form">
      <div className="login-email">
        <p>EMAIL</p>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>
      {formErrors.email ? (
        <div className="text-danger mb-2">{formErrors.email}</div>
      ) : (
        ""
      )}
      <div className="login-password">
        <p>PASSWORD</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />
      </div>
      {formErrors.password ? (
        <div className="text-danger mb-2">{formErrors.password}</div>
      ) : (
        ""
      )}
      {formErrors.response ? (
        <div className="text-danger mb-2">{formErrors.response}</div>
      ) : (
        ""
      )}

      <div className="login-button">
        <div className="login-button-signin">
          <button type="submit" onClick={handleSubmit}>
            LOGIN
          </button>
        </div>

        <div className="login-button-register">
          <Link to="/register">
            <button>REGISTER</button>
          </Link>
        </div>
      </div>
    </Form>
  );
}

export default Login_Form;
