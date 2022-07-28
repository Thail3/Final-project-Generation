import React, { useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  console.log(location);

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
            <Link to="/form">
              <button>ADD ACTIVITIES</button>
            </Link>
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
