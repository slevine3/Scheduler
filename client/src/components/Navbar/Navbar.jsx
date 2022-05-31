import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <Link to="/">
        <img
          className="navbarLogo"
          src="https://www.sasa-software.com/wp-content/uploads/2020/12/logo.d110a0.webp"
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default Navbar;
