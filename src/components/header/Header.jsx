import React, { useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";

function Header() {
  const { clearActivity } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleClick = () => {
    clearActivity();
    navigate("/form");
  };

  return (
    <section className="header">
      {location.pathname === "/" ? (
        <>
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

          <div className="header-activity-responsive">
            <button>ALL</button>
            <div className="header-dropdown">
              <select>
                <option value="bike">bike</option>
                <option value="car">car</option>
                <option value="bus">bus</option>
                <option value="train">train</option>
              </select>
            </div>
          </div>
          <div className="header-add-responsive">
            <button onClick={handleClick}>ADD ACTIVITIES</button>
          </div>
        </>
      ) : (
        <>
          <div className="header-activity-change">
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Header;
