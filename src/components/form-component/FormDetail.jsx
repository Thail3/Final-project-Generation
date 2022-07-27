import React from "react";
import "./formDetail.css";

function FormDetail() {
  return (
    <section>
      <form className="form-component">
        <div className="form-title">
          <label htmlFor="name">Title</label>
          <input type="text" name="title" />
        </div>

        <div className="form-img">
          <img
            src="https://res.cloudinary.com/dk7xxtqnj/image/upload/v1645509448/paj9bphpazesgwmj7dyc.jpg"
            alt=""
          />
        </div>

        <div className="form-type-select">
          <p>Type</p>
          <select name="type">
            <option value="run">Run</option>
            <option value="swim">Swim</option>
            <option value="fly">Fly</option>
          </select>
        </div>

        <div className="form-date-time">
          <p>Date / Time</p>
          <input type="date" name="date" />
        </div>

        <div className="form-duration">
          <p>Duration</p>
          <input type="time" name="duration" />
        </div>

        <div className="form-desc">
          <p>Description</p>
          <input type="text" name="description" />
        </div>

        <button>ADD ACTIVITIES</button>
      </form>
    </section>
  );
}

export default FormDetail;
