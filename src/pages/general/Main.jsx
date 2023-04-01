import React, { useState, useEffect } from "react";
import Header from "../../components/general/Header"
import Jobs from "../../components/general/Jobs";
import axios from "axios";
import Navbar from "../../components/general/Navbar";
import NavbarLog from "../../components/user/Navbar-log";
import Help from "./Help";

export default function Main() {
  //const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [jobs, setJobs] = useState([]);
  const [nrRequests, setNrRequests] = useState(0);
  const token = localStorage.getItem("authToken");
  const [jobsPictures, setJobsPictures] = useState([]);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem('user'))
      ? true
      : false || JSON.parse(localStorage.getItem('company'))
      ? true
      : false
  )
  useEffect(() => {
    if (jobs.length === 0 && auth && nrRequests < 1) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(process.env.REACT_APP_BASE_URL+"/api/jobs/recommendedJobsForUser", { headers }).then((response) => {
        setNrRequests(nrRequests + 1);
        if (
          response.data !== undefined &&
          response.data !== null &&
          response.data !== jobs
        ) {
          setJobs(response.data["jobs"]);
          setJobsPictures(response.data["pictures"]);
        } else {
          alert("Please log in again")
          console.log("Eronat", response.data);
        }
      });
    }
  });

  if (auth) {
    return (
      <div className="App">
        <NavbarLog  />
        <Header />
        {/* show recommended jobs */}
        {jobs.length > 0 && (
          <div>
            <h2 id="title-jobs-for-you">
              We found {jobs.length} jobs for you! Check them out!
            </h2>
            <Jobs
              jobs={jobs}
              jobsPictures={jobsPictures}
              loaded_from_db={false}
              is_saved={false}
            />
          </div>
        )}
        {jobs.length <= 0 && (
          <h2 id="title-jobs-for-you">
            Not found jobs! Configure a good profile!
          </h2>
        )}
        
        
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <Header />
        <p id="title-jobs-for-you"> Hello, please log in or register </p>
        <br></br>
        <Help isCompany={false} hasNavbar={false} />
      </div>
    );
  }
}
