import React, { useState } from "react";
import "./header.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function Header() {
  const options = ["bike", "car", "bus", "train", "truck", "van", "other"];

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
        <button>ADD ACTIVITIES</button>
      </div>
    </section>
  );
}

export default Header;
