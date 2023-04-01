import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import {useRef} from "react"
import {FaBars, FaTimes} from "react-icons/fa"
import {
  faPlus,
  faBuildingCircleArrowRight,
  faBuilding,
  faCircleQuestion,
  faHouseLaptop,
} from "@fortawesome/free-solid-svg-icons";

const CNavbar = () => {

  const navRef = useRef();
  const showNavBar = () =>{
      navRef.current.classList.toggle("responsive_nav");
  }
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
        <button className='nav-btn nav-close-btn' onClick = {showNavBar}>
              <FaTimes />
          </button>
          <div className="link">
            <FontAwesomeIcon icon={faCircleQuestion} id="icon-search" />
            <Link to="/help-company" className="link-text">
              Help
            </Link>
          </div>
          <div className="link">
            <FontAwesomeIcon icon={faPlus} id="icon-search" />
            <Link to="/add-job" className="link-text">
              Add Job
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon icon={faBuilding} id="icon-register" />
            <Link to="/profile-company" className="link-text">
              Company
            </Link>
          </div>

          <div className="link">
            <FontAwesomeIcon
              icon={faBuildingCircleArrowRight}
              id="icon-log-out"
            />
            <Link to="/" className="link-text" onClick={handleLogOut}>
              Log Out
            </Link>
          </div>
          
        </div>
        <button className='nav-btn' onClick = {showNavBar}>
              <FaBars/>
        </button> 
      </nav>
    </div>
  );
};

export default CNavbar;
