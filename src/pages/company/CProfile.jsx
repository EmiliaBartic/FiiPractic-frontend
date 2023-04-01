import React, { useState, useEffect } from "react";
import CNavbar from "../../components/company/CNavBar-log";

import "../../styles/profile.css";
import axios from "axios";

import CompanyProfilePicture from "../../components/company/CompanyProfilePicture";
import CompanyProfileJobs from "../../components/company/CompanyProfileJobs";
import CompanyProfileDescription from "../../components/company/CompanyProfileDescription";
import CompanyProfileRecommendUsers from "../../components/company/CompanyProfileRecommendUsers";
import profilePic from "../../images/default-profile-picture.png";

const CProfile = ({ isCompany,setUserFromCompanyPerspective }) => {
  
  const [jobs, setJobs] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [pictureURL, setPictureURL] = useState();
  const [description, setDescription] = useState("");
  const [userCopy, setUserCopy] = useState(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  let jobsPictures = [];

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (pictureURL === null || pictureURL === undefined) {
      let fullUrlForProfilePic =
        process.env.REACT_APP_BASE_URL + "/api/company/picture" ;
     
      axios.get(fullUrlForProfilePic, { headers }).then((response) => {
        //console.log(response)
        if (response.data === "not found") {
          setPictureURL(profilePic);
        } else {
          setPictureURL(response.data);
        }
      });
    }

    if (jobs.length === 0) {
      let url = process.env.REACT_APP_BASE_URL + "/api/company/jobsByCompanyName/";
      //let result = url + userCopy.name;

      axios.get(url, { headers }).then((response) => {
        if (
          response.data !== undefined &&
          response.data !== null &&
          response.data !== jobs
        ) {
          setJobs(response.data);
        } else {
          console.log("Eronat", response.data);
        }
      });
    }

    if (description === null || description === undefined) {
      let url = process.env.REACT_APP_BASE_URL + "/api/profile/getDescription/";
      let result = url + userCopy.id;

      axios.get(result, { headers }).then((response) => {
        if (
          response.data !== undefined &&
          response.data !== null &&
          response.data !== description
        ) {
          setDescription(response.data[0].description);
        } else {
          console.log("Eronat", response.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (pictureURL) {
        setContentLoading(false);
      }
    }, 2000);
  }, [pictureURL]);

  for (let i = 0; i < jobs.length; i++) jobsPictures.push(pictureURL);

  return (
    <div className="company-profile">
      <CNavbar />
      <div className="profile-container">
        <CompanyProfilePicture
          pictureURL={pictureURL}
          company_name={userCopy.name}
          company_email={userCopy.email}
          company_id={userCopy.id}
          contentLoading={contentLoading}
          setPictureURL={setPictureURL}
        />
        <CompanyProfileDescription
          description={description}
          setDescription={setDescription}
          user_id={userCopy.id}
        />
        <CompanyProfileJobs
          jobs={jobs}
          jobsPictures={jobsPictures}
          isCompany={isCompany}
        />
        <CompanyProfileRecommendUsers user_id={userCopy.id} jobs={jobs} setUserFromCompanyPerspective={setUserFromCompanyPerspective}/>
      </div>
    </div>
  );
};

export default CProfile;
