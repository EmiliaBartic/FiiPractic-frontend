import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  faMagnifyingGlass,
  faUser,
  faArrowRightToBracket,
  faHouseLaptop,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const NavbarLog = () => {
  const navRef = useRef();
  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const handleLogOut = () => {
   
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    document.cookie =
      "isCompany=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/");
  };

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
            <FontAwesomeIcon icon={faCircleQuestion} id="icon-search" />
            <Link to="/help-user" className="link-text">
              Help
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="icon-search" />
            <Link to="/search-company" className="link-text">
              Company
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="icon-search" />
            <Link to="/search-job" className="link-text">
              Job
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon icon={faUser} id="icon-register" />
            <Link to="/profile" className="link-text">
              Profile
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon icon={faArrowRightToBracket} id="icon-log-out" />
            <Link to="/" className="link-text" onClick={handleLogOut}>
              Log Out
            </Link>
          </div>
          <button className="nav-btn nav-close-btn" onClick={showNavBar}>
            <FaTimes />
          </button>
        </div>
        <button className="nav-btn" onClick={showNavBar}>
          <FaBars className="decoration-green" />
        </button>
      </nav>
    </div>
  );
};

export default NavbarLog;
