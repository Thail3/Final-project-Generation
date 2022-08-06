import React, { useState } from "react";
import "./formDetail.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";

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

  return (
    <section>
      <form className="form-component" onSubmit={handleSubmitForm}>
        <div className="form-title">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            pattern=".{,120}"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

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
          <select name="type" onChange={(e) => setType(e.target.value)}>
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
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-duration">
          <p>Duration</p>
          <span>Start</span>
          <input
            type="time"
            name="duration"
            onChange={(e) => setStartDuration(e.target.value)}
          />

          <span>End</span>
          <input
            type="time"
            name="duration"
            onChange={(e) => setEndDuration(e.target.value)}
          />

          {/* Change type to be Number and delete start */}
        </div>

        <div className="form-desc">
          <p>Description</p>
          <input
            type="text"
            name="description"
            pattern=".{,120}"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">ADD ACTIVITIES</button>
      </form>
    </section>
  );
}

export default FormDetail;
