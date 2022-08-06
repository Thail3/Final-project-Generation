import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./formDetail.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function FormDetail() {
  const {
    setTitle,
    setImgActivities,
    setType,
    setDate,
    setStartDuration,
    setEndDuration,
    setDescription,
    createActivity,
  } = useGlobalContext();

  const navigate = useNavigate();

  const changeImg = () => {
    if (setType() === "Running") {
      setImgActivities("");
    } else if (setType() === "Cycling") {
      setImgActivities("");
    } else if (setType() === "Swimming") {
      setImgActivities("");
    } else if (setType() === "Walking") {
      setImgActivities("");
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    createActivity();
    navigate("/");
  };

  const initialValues = {
    title: "",
    date: new Date().toISOString().substring(0, 10),
    type: "run",
    timeStart: "",
    timeEnd: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    console.log("isSubmit ", isSubmit);
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      // onSubmit
      createActivity();
      navigate("/");
    }
      setTitle(formValues.title)
      setType(formValues.type)
      setDate(formValues.date)
      setStartDuration(formValues.timeStart)
      setEndDuration(formValues.timeEnd)
      setDescription(formValues.description)
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    } else if (values.title.length > 140) {
      errors.title = "Title cannot exceed more than 140 characters";
    }
    if (!values.date) {
      errors.date = "Date is required";
    }
    return errors;
  };

  return (
    <section>
      <Form className="form-component" noValidate onSubmit={handleSubmit}>
        <div className="form-title">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            value={formValues.title}
            onChange={handleChange}
            name="title"
            pattern=".{,120}"
          />
        </div>
        {formErrors.title ? (
          <div className="text-danger m-2">{formErrors.title}</div>
        ) : (
          ""
        )}

        {setType ? (
          <div className="form-img">
            <img
              src="https://res.cloudinary.com/dk7xxtqnj/image/upload/v1645509448/paj9bphpazesgwmj7dyc.jpg"
              alt=""
              onChange={changeImg}
            />
          </div>
        ) : null}

        <div className="form-type-select">
          <p>Type</p>
          <select name="type" value={formValues.type} onChange={handleChange}>
            <option value="run">Run</option>
            <option value="swim">Swim</option>
            <option value="fly">Fly</option>
          </select>
        </div>

        <div className="form-date-time">
          <p>Date / Time</p>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-duration">
          <p>Duration</p>
          <span>Start</span>
          <input
            type="time"
            name="timeStart"
            value={formValues.timeStart}
            onChange={handleChange}
          />
          <span>End</span>
          <input
            type="time"
            name="timeEnd"
            value={formValues.timeEnd}
            onChange={handleChange}
          />
        </div>

        <div className="form-desc">
          <p>Description</p>
          <input
            type="text"
            value={formValues.description}
            onChange={handleChange}
            name="description"
            pattern=".{,120}"
          />
        </div>
        {formErrors.description ? (
          <div className="text-danger m-2">{formErrors.description}</div>
        ) : (
          ""
        )}
        <button type="submit" onClick={handleSubmit}>
          ADD ACTIVITIES
        </button>
      </Form>
    </section>
  );
}

export default FormDetail;
