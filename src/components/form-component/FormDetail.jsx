import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./formDetail.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function FormDetail() {
  const {
    title,
    setTitle,
    imgActivities,
    setImgActivities,
    type,
    setType,
    date,
    setDate,
    startDuration,
    setStartDuration,
    endDuration,
    setEndDuration,
    description,
    setDescription,
    createActivity,
    updateActivity,
  } = useGlobalContext();
  const initialValues = {
    title: title || "",
    date: date == "" ? new Date().toISOString().substring(0, 10) : date,
    type: type == "" ? "run" : type,
    startDuration: startDuration == "" ? "00:00" : startDuration,
    endDuration: endDuration == "" ? "00:00" : endDuration,
    description: description || "",
    imgActivities: imgActivities,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log("FormDetail location", location.pathname);
  console.log("FormDetail useParams", id);

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
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const clearFormValues = () => {
    clearActivity();
    setFormValues(initialValues);
  };

  const editMode = () => {
    return id ? true : false
  }

  useEffect(() => {
    console.log("date eff :", date);
    console.log("use effect isSubmit : ", isSubmit);
    console.log("use effect formErrors : ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("use effect form value in if : ", formValues);
      if(editMode()) {
        updateActivity(id);
      } else {
        createActivity();
      }
      navigate("/");
      clearFormValues();
    }
    console.log("use effect form value : ", formValues);
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
    if (!values.type) {
      errors.type = "Type is required";
    }
    if (!values.startDuration) {
      errors.startDuration = "Start duration is required";
    }
    if (!values.endDuration) {
      errors.endDuration = "End duration is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    handleChange(e);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    handleChange(e);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    handleChange(e);
  };
  const handleStartDuration = (e) => {
    console.log("form detail start duration", e.target.value);
    setStartDuration(e.target.value);
    handleChange(e);
  };
  const handleEndDuration = (e) => {
    setEndDuration(e.target.value);
    handleChange(e);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    handleChange(e);
  };

  return (
    <section>
      {location.pathname === `/form/${id}` ? (
        <Form className="form-component" onSubmit={handleEditForm}>
          <div className="form-title">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              name="title"
              pattern=".{,120}"
              value={formValues.title}
              onChange={handleTitleChange}
            />
          </div>

          {setType ? (
            <div className="form-img">
              <img
                src="https://res.cloudinary.com/dk7xxtqnj/image/upload/v1645509448/paj9bphpazesgwmj7dyc.jpg"
                alt=""
                value={formValues.imgActivities}
                onChange={changeImg}
              />
            </div>
          ) : null}

          <div className="form-type-select">
            <p>Type</p>
            <select
              name="type"
              onChange={handleTypeChange}
              value={formValues.type}
            >
              <option value="">select Type of Activities</option>
              <option value="run">Run</option>
              <option value="swim">Swim</option>
              <option value="fly">Fly</option>
            </select>
          </div>
          {formErrors.type ? (
            <div className="text-danger m-2">{formErrors.type}</div>
          ) : (
            ""
          )}

          <div className="form-date-time">
            <p>Date / Time</p>
            <input
              type="date"
              name="date"
              onChange={handleDateChange}
              value={formValues.date}
            />
          </div>
          {formErrors.date ? (
            <div className="text-danger m-2">{formErrors.date}</div>
          ) : (
            ""
          )}

          <div className="form-duration">
            <p>Duration</p>
            <span>Start</span>
            <input
              type="time"
              name="startDuration"
              onChange={handleStartDuration}
              value={formValues.startDuration}
            />
            {formErrors.startDuration ? (
              <div className="text-danger m-2">{formErrors.startDuration}</div>
            ) : (
              ""
            )}

            <span>End</span>
            <input
              type="time"
              name="endDuration"
              onChange={handleEndDuration}
              value={formValues.endDuration}
            />
            {formErrors.endDuration ? (
              <div className="text-danger m-2">{formErrors.endDuration}</div>
            ) : (
              ""
            )}

            {/* Change type to be Number and delete start */}
          </div>

          <div className="form-desc">
            <p>Description</p>
            <input
              type="text"
              name="description"
              pattern=".{,120}"
              onChange={handleDescription}
              value={formValues.description}
            />
          </div>
          {formErrors.description ? (
            <div className="text-danger m-2">{formErrors.description}</div>
          ) : (
            ""
          )}

          <button type="submit">EDIT ACTIVITIES</button>
        </Form>
      ) : (
        <Form className="form-component" onSubmit={handleSubmitForm}>
          <div className="form-title">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              name="title"
              pattern=".{,120}"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {setType ? (
            <div className="form-img">
              <img
                src="https://res.cloudinary.com/dk7xxtqnj/image/upload/v1645509448/paj9bphpazesgwmj7dyc.jpg"
                alt=""
                value={formValues.imgActivities}
                onChange={changeImg}
              />
            </div>
          ) : null}

          <div className="form-type-select">
            <p>Type</p>
            <select
              name="type"
              onChange={handleTypeChange}
              value={formValues.type}
            >
              <option value="">select Type of Activities</option>
              <option value="run">Run</option>
              <option value="swim">Swim</option>
              <option value="fly">Fly</option>
            </select>
          </div>
          {formErrors.type ? (
            <div className="text-danger m-2">{formErrors.type}</div>
          ) : (
            ""
          )}

          <div className="form-date-time">
            <p>Date / Time</p>
            <input
              type="date"
              name="date"
              onChange={handleDateChange}
              value={formValues.date}
            />
          </div>
          {formErrors.date ? (
            <div className="text-danger m-2">{formErrors.date}</div>
          ) : (
            ""
          )}

          <div className="form-duration">
            <p>Duration</p>
            <span>Start</span>
            <input
              type="time"
              name="startDuration"
              onChange={handleStartDuration}
              value={formValues.startDuration}
            />
            {formErrors.startDuration ? (
              <div className="text-danger m-2">{formErrors.startDuration}</div>
            ) : (
              ""
            )}

            <span>End</span>
            <input
              type="time"
              name="endDuration"
              onChange={handleEndDuration}
              value={formValues.endDuration}
            />
            {formErrors.endDuration ? (
              <div className="text-danger m-2">{formErrors.endDuration}</div>
            ) : (
              ""
            )}

            {/* Change type to be Number and delete start */}
          </div>

          <div className="form-desc">
            <p>Description</p>
            <input
              type="text"
              name="description"
              pattern=".{,120}"
              onChange={handleDescription}
              value={formValues.description}
            />
          </div>
          {formErrors.description ? (
            <div className="text-danger m-2">{formErrors.description}</div>
          ) : (
            ""
          )}

          <button type="submit">ADD ACTIVITIES</button>
        </Form>
      )}
    </section>
  );
}

export default FormDetail;
