import React, { useState } from "react";
import "./header.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/form");
  };

  return (
    <section className="header">
      <div className="header-activity">
        <button>ALL</button>
        <button>RUN</button>
        <button>SWIM</button>
        <div className="header-dropdown">
          <select>
            <option value="bike">bike</option>
            <option value="car">car</option>
            <option value="bus">bus</option>
            <option value="train">train</option>
          </select>
        </div>
      </div>
      <div className="header-add">
        <button onClick={handleClick}>ADD ACTIVITIES</button>
      </div>
    </section>
  );
}

export default Header;
