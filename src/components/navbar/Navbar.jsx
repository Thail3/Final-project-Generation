import React from "react";
import "./navbar.css";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Navbar() {
  const location = useLocation();
  return (
    <div className="navbar-head p-2 rounded-3 container">
      {location.pathname === "/profile" ?
      <Link to="/">
        <Button variant="outline-primary" size="lg" className="backButton">
        <IoIosArrowBack className="mb-1" />
          Back
        </Button>
      </Link> : null}
      
      <span>WELCOME TO YOUR ACTIVITIES</span>

      {location.pathname === "/profile" ?
      <Link to="/">
        <Button variant="outline-danger" size="lg" className="logoutButton">
        <RiLogoutBoxRLine className="mb-1" />
          {" Log Out"}
        </Button>
      </Link> : null}
    </div>
  );
}

export default Navbar;
