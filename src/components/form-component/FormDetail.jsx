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
    clearActivity,
  } = useGlobalContext();

  const initialValues = {
    title: title || "",
    date: date,
    type: type == "" ? "" : type,
    startDuration: startDuration == "" ? "" : startDuration,
    endDuration: endDuration == "" ? "" : endDuration,
    description: description || "",
    imgActivities: imgActivities || "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  console.log("FormDetail formValues", formValues);
  console.log("formErrors", formErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log("FormDetail location", location.pathname);
  console.log("FormDetail useParams", id);

  const changeImg = (val) => {
    if (val == "") {
      setImgActivities("../../src/assets/fitness.png");
    }
    if (val == "runing") {
      setImgActivities("../../src/assets/run.png");
    }
    if (val == "swiming") {
      setImgActivities("../../src/assets/swimming.png");
    }
    if (val == "bike") {
      setImgActivities("../../src/assets/bike.png");
    }
    if (val == "hiking") {
      setImgActivities("../../src/assets/hiking.png");
    }
    if (val == "scuba-diving") {
      setImgActivities("../../src/assets/scuba-diving.png");
    }
    if (val == "walking") {
      setImgActivities("../../src/assets/walking.png");
    }
    if (val == "weight-lifting") {
      setImgActivities("../../src/assets/weight-lifting.png");
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
    return id ? true : false;
  };

  const setDefaultValues = () => {
    setTitle(title == "" ? formValues.title : title);
    setDate(date == "" ? formValues.date : date);
    setType(type == "" ? formValues.type : type);
    setStartDuration(
      startDuration == "" ? formValues.startDuration : startDuration
    );
    setEndDuration(endDuration == "" ? formValues.endDuration : endDuration);
    setDescription(description == "" ? formValues.description : description);
    setImgActivities(
      imgActivities == "" ? formValues.imgActivities : imgActivities
    );
  };

  useEffect(() => {
    console.log("date eff :", date);
    console.log("use effect isSubmit : ", isSubmit);
    console.log("use effect formErrors : ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("use effect form value in if : ", formValues);
      //set default value to empty string if no change
      setDefaultValues();
      if (editMode()) {
        updateActivity(id);
      } else {
        createActivity();
      }
      clearFormValues();
      navigate("/");
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
    changeImg(e.target.value);
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
              value={formValues.title}
              onChange={handleTitleChange}
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
              value={formValues.title}
              onChange={handleTitleChange}
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
                src={imgActivities}
                alt=""
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
              <option value="runing">Runing</option>
              <option value="swiming">Swiming</option>
              <option value="bike">Bike</option>
              <option value="hiking">hiking</option>
              <option value="scuba-diving">scuba-diving</option>
              <option value="walking">walking</option>
              <option value="weight-lifting">weight-lifting</option>
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
