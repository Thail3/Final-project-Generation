import React, { useState } from "react";
import "./formDetail.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";

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
    createActivity();
    navigate("/");
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    updateActivity(id);
    navigate("/");
  };

  return (
    <section>
      {location.pathname === `/form/${id}` ? (
        <form className="form-component" onSubmit={handleEditForm}>
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
                value={imgActivities}
                onChange={changeImg}
              />
            </div>
          ) : null}

          <div className="form-type-select">
            <p>Type</p>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="run">Run</option>
              <option value="swim">Swim</option>
              <option value="fly">Fly</option>
              <option value="drive">Drive</option>
            </select>
          </div>

          <div className="form-date-time">
            <p>Date / Time</p>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-duration">
            <p>Duration</p>
            <span>Start</span>
            <input
              type="time"
              name="duration"
              value={startDuration}
              onChange={(e) => {
                console.log("form detail start duration", e.target.value);
                setStartDuration(e.target.value);
              }}
            />

            <span>End</span>
            <input
              type="time"
              name="duration"
              value={endDuration}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit">EDIT ACTIVITIES</button>
        </form>
      ) : (
        <form className="form-component" onSubmit={handleSubmitForm}>
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
                value={imgActivities}
                onChange={changeImg}
              />
            </div>
          ) : null}

          <div className="form-type-select">
            <p>Type</p>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">select Type of Activities</option>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-duration">
            <p>Duration</p>
            <span>Start</span>
            <input
              type="time"
              name="duration"
              value={startDuration}
              onChange={(e) => {
                console.log("form detail start duration", e.target.value);
                setStartDuration(e.target.value);
              }}
            />

            <span>End</span>
            <input
              type="time"
              name="duration"
              value={endDuration}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit">ADD ACTIVITIES</button>
        </form>
      )}
    </section>
  );
}

export default FormDetail;
