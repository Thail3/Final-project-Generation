import React, { useState } from "react";
import "./header.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const options = ["bike", "car", "bus", "train", "truck", "van", "other"];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/form");
  };

  const defaultOption = options[0];

  return (
    <section className="header">
      <div className="header-activity">
        <button>ALL</button>
        <button>RUN</button>
        <button>SWIM</button>
        <div className="header-dropdown">
          <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
          />
        </div>
      </div>
      <div className="header-add">
        <button onClick={handleClick}>ADD ACTIVITIES</button>
      </div>
    </section>
  );
}

export default Header;
