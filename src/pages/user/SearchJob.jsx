import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Jobs from "../../components/general/Jobs";
import NavbarLog from "../../components/user/Navbar-log";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/searchJob.css";

export default function SearchJob() {
  const [jobs, setJobs] = useState([]);
  const [jobsPictures, setJobsPictures] = useState([]);
  const token = localStorage.getItem("authToken");

  const searchJob = () => {
    let searchInput = document.getElementById("SearchInput").value;
    let country = document.getElementById("CountryInput").value;
    let experience = document.getElementById("experience").value;
    let time = document.getElementById("time").value;
    let type = document.getElementById("type").value;

    if (searchInput.length === 0) searchInput = "all";
    else searchInput = searchInput.replaceAll(" ", "");
    if (country.length === 0) country = "all";
    if (experience.length === 0) experience = "all";
    if (time.length === 0) time = "all";
    if (type.length === 0) type = "all";

    //console.log(country, experience, time, type, company);
    let url = process.env.REACT_APP_BASE_URL + "/api/jobs/getFilteredJobs/";
    let result =
      url +
      searchInput +
      "/" +
      country +
      "/" +
      experience +
      "/" +
      time +
      "/" +
      type;

    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get(result, { headers }).then((response) => {
      if (response.data !== undefined && response.data !== null) {
        setJobs(response.data["jobs"]);
        setJobsPictures(response.data["pictures"]);
        console.log(response.data);
      } else {
        console.log("Eronat", response.data);
      }
    });
  };

  return (
    <div className="searchJob">
    <NavbarLog  />
    <div className="searchJob__container">
      <div className="searchJob__container__search">
        <div className="searchJob__container__search__searchBar">
          <div className="searchJob__container__search__searchBar__element">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="faMagnifyingGlass" />
            <input
              type="text"
              placeholder="Type job title"
              id="SearchInput"
            ></input>
          </div>
          <div className="searchJob__container__search__searchBar__element">
            <FontAwesomeIcon icon={faLocationDot} id="faLocationDot" />
            <input
              type="text"
              placeholder="Type country"
              id="CountryInput"
            ></input>
          </div>
          
        </div> 
        <div className="searchJob__container__search__inputs">
          <select id="experience">
            <option value="" disabled  hidden defaultValue={"all"}>
              Experience
            </option>
            <option value="all">All</option>
            <option value="Internship">Internship</option>
            <option value="Junior">Junior</option>
            <option value="Mid/Senior">Mid-Senior Level</option>
            <option value="Associate">Associate</option>
            <option value="Director">Director</option>
          </select>

          <select id="time">
            <option value="" disabled  hidden defaultValue={"all"}>
              FullTime / PartTime
            </option>
            <option value="all">All</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">PartTime</option>
          </select>

          <select id="type">
            <option value="" disabled  hidden defaultValue={"all"}>
              Remote / On-Site
            </option>
            <option value="all">All</option>
            <option value="Remote">Remote</option>
            <option value="OnSite">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>

        </div>
        <Button variant="outline-primary" id="filterBtn" onClick={searchJob}>
          Filter jobs
        </Button>
      </div>
      <div className="searchJob__container__results">
        <Jobs jobs={jobs} jobsPictures={jobsPictures} loaded_from_db={true} is_saved={false} />
      </div>
    </div>
  </div>
  );
}
