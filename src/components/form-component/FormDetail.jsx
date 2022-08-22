import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./formDetail.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import imgRun from "../../assets/run.png";
import imgBike from "../../assets/bike.png";
import imgSwim from "../../assets/swimming.png";
import imgWalk from "../../assets/walking.png";
import imgWeight from "../../assets/weight-lifting.png";
import imgScuba from "../../assets/scuba-diving.png";
import imgHike from "../../assets/hiking.png";
import axios from "axios";
// import dotenv from "dotenv";
console.log(imgRun);

// dotenv.config();

function FormDetail() {
  const {
    activities,
    setActivityData,
    buildActivityData,
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
    typeToImageActivityPath,
  } = useGlobalContext();

  const initialValues = {
    title: title || "",
    date: date,
    type: type == "" ? "" : type,
    startDuration: startDuration == "" ? "" : startDuration,
    endDuration: endDuration == "" ? "" : endDuration,
    description: description || "",
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

  const url = "https://final-project-backend-ashy.vercel.app";

  const getActivityById = async (acitvityId) => {
    try {
      const res = await axios.get(`${url}/activity/${acitvityId}`);
      console.log("Context getActivityById", res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  //! เปลี่ยนชื่อ abc ให้เป้นตัวอื่นที่ไม่ซ้ำกัน
  const initialEditActivityPage = (abc) => {
    console.log("initialEditActivityPage activityData", abc);
    if (abc) {
      let activityData = buildActivityData(
        abc.title,

        abc.type,
        abc.date,
        abc.duration,
        abc.desc
      );
      setFormValues(activityData);
    }
  };

  // const changeImg = (val) => {
  //   if (val === "run") {
  //     setImgActivities(imgRun);
  //   } else if (val === "bike") {
  //     setImgActivities(imgBike);
  //   } else if (val === "swim") {
  //     setImgActivities(imgSwim);
  //   } else if (val === "walk") {
  //     setImgActivities(imgWalk);
  //   } else if (val === "weight") {
  //     setImgActivities(imgWeight);
  //   } else if (val === "scuba") {
  //     setImgActivities(imgScuba);
  //   } else if (val === "hike") {
  //     setImgActivities(imgHike);
  //   }
  // };

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
    // setImgActivities(
    //   // imgActivities == "" ? formValues.imgActivities : imgActivities
    // );
  };

  const getTimezoneOffset = () => {
    function z(n) {
      return (n < 10 ? "0" : "") + n;
    }
    var offset = new Date().getTimezoneOffset();
    var sign = offset < 0 ? "+" : "-";
    offset = Math.abs(offset);
    return sign + z((offset / 60) | 0) + z(offset % 60);
  };

  const getDateTimeUtc = (dateString, timeString) => {
    let dateUTCTextNoTimezone = new Date(
      Date.UTC(
        +dateString.substring(0, 4),
        +dateString.substring(5, 7) - 1,
        +dateString.substring(8, 10),
        +timeString.substring(0, 2),
        +timeString.substring(3, 5),
        0,
        0
      )
    ).toISOString();

    let dateUTC = new Date(
      Date.parse(dateUTCTextNoTimezone.slice(0, -1) + getTimezoneOffset()) // example getTimezoneOffset() -> +0700 (Asia/Bangkok)
    );

    return dateUTC;
  };

  const getDuration = (startDate, endDate) => {
    let timeDiff = endDate.getTime() - startDate.getTime();
    return timeDiff / 1000 / 60; // millis -> minutes
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
        // newTitle,
        // newType,
        // newDate,
        // newDuration,
        // newDesc

        // let dateWithoutTime = formValues.date;
        // let startTime = formValues.startDuration;
        // let endTime = formValues.endDuration;
        // 2022-08-14T00:00:00.000Z

        // new Date().toISOString()
        // '2022-08-21T07:29:31.558Z
        // {date}T{start}:00.000Z

        // let date = formValues.date + "T" + formValues.startDuration + ":00.000Z";

        // เอาค่าใน form ไป set state เดิม
        let startDateUtc = getDateTimeUtc(
          formValues.date,
          formValues.startDuration
        );
        let endDateUtc = getDateTimeUtc(
          formValues.date,
          formValues.endDuration
        );
        let updateData = {
          title: formValues.title,
          type: formValues.type,
          date: startDateUtc.toISOString(),
          duration: getDuration(startDateUtc, endDateUtc),
          desc: formValues.description,
        };

        updateActivity(id, updateData);
      } else {
        createActivity();
      }
      clearFormValues();
      navigate("/");
    }
    console.log("use effect form value : ", formValues);

    // fix refresh data missing
    //!เปลี่ยนชื่อ abc ให้เป้นตัวอื่นที่ไม่ซ้ำกัน
    if (editMode()) {
      getActivityById(id).then((abc) => {
        initialEditActivityPage(abc);
      });
    }
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
    // changeImg(e.target.value);
    // typeToImageActivityPath(e.target.value);
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
              <img src={typeToImageActivityPath(formValues.type)} alt="" />
            </div>
          ) : (
            ""
          )}

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
              <option value="bike">bike</option>
              <option value="walk">walk</option>
              <option value="hike">hike</option>
              <option value="scuba">scuba</option>
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
                src={typeToImageActivityPath(formValues.type)}
                // value={formValues.imgActivities}
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
              <option value="bike">bike</option>
              <option value="walk">walk</option>
              <option value="hike">hike</option>
              <option value="scuba">scuba</option>
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
