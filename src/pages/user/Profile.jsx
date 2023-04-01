import React, { useState, useEffect } from "react";

import { pdfjs } from "react-pdf";
import axios from "axios";
import NavbarLog from "../../components/user/Navbar-log";
import PNamePicture from "../../components/user/PNamePicture";
import PDescription from "../../components/user/PDescription";
import PSkills from "../../components/user/PSkills";
import PEducation from "../../components/user/PEducation";
import PExperience from "../../components/user/PExperience";
import PSavedJobs from "../../components/user/PSavedJobs";
import PCV from "../../components/user/PCV";
import profilePic from "../../images/default-profile-picture.png";
import "../../styles/profile.css";

export default function Profile({ isCompany }) {
  pdfjs.GlobalWorkerOptions.workerSrc =
    "cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js";
  const [contentLoading, setContentLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [skills, setSkills] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const token = localStorage.getItem("authToken");
  const [usercv, setUserCV] = useState([]);
  const [fileURL, setFileURL] = useState();
  const [pictureURL, setPictureURL] = useState();
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [savedJobs, setSavedJobs] = useState(null);
  const [jobsPictures, setJobsPictures] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (pictureURL === null || pictureURL === undefined) {
      axios
        .get(
          process.env.REACT_APP_BASE_URL + "/api/profile/getProfilePicture/",
          { headers }
        )
        .then((response) => {
          if (response.data === "not found") setPictureURL(profilePic);
          else setPictureURL(response.data);
        });
    }

    if (
      skills === null &&
      education === null &&
      experience === null &&
      savedJobs === null
    ) {
      axios
        .get(process.env.REACT_APP_BASE_URL + "/api/profile/getUserArrays", {
          headers,
        })
        .then((response) => {
          if (response.data !== undefined && response.data !== null) {
            setSkills(response.data.skills);
            setEducation(response.data.education);
            setExperience(response.data.experience);
            setSavedJobs(response.data.savedJobs["jobs"]);
            setJobsPictures(response.data.savedJobs["pictures"]);
            setFileURL(response.data.cvpath);
            setDescription(response.data.description);
            setGithubLink(response.data.githubLink);
            setLinkedInLink(response.data.linkedInLink);
            if(response.data.cvpath !== "no cv uploaded")
                setUserCV(response.data.cvpath);
            else  setUserCV(null);
          } else {
            console.log("Eronat", response.data);
          }
        });
    }
  }, [
    skills,
    education,
    experience,
    savedJobs,
    jobsPictures,
    fileURL,
    description,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (pictureURL) {
        setContentLoading(false);
      }
    }, 2000);
  }, [pictureURL]); 

  return (
    <div className="profile">
      <NavbarLog/>
      <div className="profile-container">
        <PNamePicture
          pictureURL={pictureURL}
          user_name={user.name}
          user_email={user.email}
          user_id={user.id}
          contentLoading={contentLoading}
          setPictureURL={setPictureURL}
        />

        <PDescription
          user_id={user.id}
          token={token}
          description={description}
          setDescription={setDescription}
          linkedInLink={linkedInLink}
          setLinkedInLink={setLinkedInLink}
          githubLink={githubLink}
          setGithubLink={setGithubLink}
        />

        <PSkills
          skills={skills}
          setSkills={setSkills}
          user_idd={user.id}
          token={token}
          usercv={usercv}
          contentLoading={contentLoading}
        />

        <PEducation
          education={education}
          setEducation={setEducation}
          user_id={user.id}
          token={token}
          contentLoading={contentLoading}
        />

        <PExperience
          experience={experience}
          user_id={user.id}
          token={token}
          setExperience={setExperience}
          contentLoading={contentLoading}
          usercv={usercv}
        />

        <PSavedJobs
          savedJobs={savedJobs}
          jobsPictures={jobsPictures}
          isCompany={isCompany}
          loaded_from_db={true}
          setSavedJobs={setSavedJobs}
          contentLoading={contentLoading}
        />

        <PCV
          userCV={usercv}
          setUserCV={setUserCV}
          fileURL={fileURL}
          user_id={user.id}
          user__name={user.name}
        />
      </div>
    </div>
  );
}
