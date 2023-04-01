import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import {
  faHouseLaptop,
  faUser,
  faArrowRightToBracket,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react"
import {FaBars, FaTimes} from "react-icons/fa"

const Navbar = () => {
  const navRef = useRef();
  const showNavBar = () =>{
      navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <div>
      <nav className="navbar">
        <div className="home-btn">
          <FontAwesomeIcon icon={faHouseLaptop} id="icon-house" />
          <Link to="/" className="link-text">
            JobFinder
          </Link>
        </div>

        <div className="nav-links" ref={navRef}>
          <div className="link">
            <FontAwesomeIcon icon={faUser} className="icon-navbar" />
            <Link to="/register" className="link-text">
              User Sign Up
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon icon={faBuilding} className="icon-navbar" />
            <Link to="/registerCompany" className="link-text">
              Company Sign Up
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              className="icon-navbar"
            />
            <Link to="/login" className="link-text">
              Log In
            </Link>
          </div>

          <button className='nav-btn nav-close-btn' onClick = {showNavBar}>
              <FaTimes />
          </button>
        </div>
        <button className='nav-btn' onClick = {showNavBar}>
              <FaBars/>
        </button> 
      </nav>
    </div>
  );
};

export default Navbar;
