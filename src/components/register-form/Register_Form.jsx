import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./register_Form.css";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function Register_Form() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 4) {
      errors.username = "Username must be more than 4 characters";
    } else if (values.username.length > 16) {
      errors.username = "Username cannot exceed more than 16 characters";
    }
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

  const toggleIsPasswordShowValue = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <section className="register-form">
      <Form noValidate onSubmit={handleSubmit}>
        <div className="register-form-username">
          <p>USERNAME</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleChange}
            title="Username must be between 4 and 16 characters."
            required
          />
        </div>
        {formErrors.username ? (
        <div className="text-danger mb-2">
          {formErrors.username}
        </div>
      ) : ("")}

        <div className="register-form-password">
          <p>PASSWORD</p>
          <InputGroup className="mb-3" size="lg">
            <input
              className="input"
              type={isPasswordShow ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              pattern=".{8,128}"
              title="Password must be at least 8 characters."
              required
            />
            {isPasswordShow ? (
              <Button variant="light" onClick={toggleIsPasswordShowValue}>
                <AiOutlineEyeInvisible />
              </Button>
            ) : (
              <Button variant="light" onClick={toggleIsPasswordShowValue}>
                <AiOutlineEye />
              </Button>
            )}
          </InputGroup>
        </div>
        {formErrors.password ? (
        <div className="text-danger mb-2">
          {formErrors.password}
        </div>
      ) : ("")}

        <div className="register-form-email">
          <p>EMAIL</p>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Email must be a valid email."
            required
          />
        </div>
        {formErrors.email ? (
        <div className="text-danger mb-2">
          {formErrors.email}
        </div>
      ) : ("")}
        <div className="register-form-button">
          <button type="submit" onClick={handleSubmit}>REGISTER</button>
        </div>
      </Form>
    </section>
  );
}

export default Register_Form;
