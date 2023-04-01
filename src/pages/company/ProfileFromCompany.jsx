import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import CNavbar from "../../components/company/CNavBar-log";
import profilePic from "../../images/default-profile-picture.png";
import Skill from "../../components/user/Skill";
import Education from "../../components/user/Education";
import Experience from "../../components/user/Experience";


export default function ProfileFromCompany({ user_id }) {
  const token = localStorage.getItem("authToken");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (profileData === null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(
          process.env.REACT_APP_BASE_URL +
            "/api/profile/informationForCompany/" +
            user_id,
          { headers }
        )
        .then((response) => {
          if (response.data != null) {
            console.log("response.data:", response.data);
            setProfileData(response.data);
            console.log(response.data.profilePicture);
          }
        });
    }
  });
  if (profileData != null) {
      return (
        <div className="profile">
          <CNavbar />
          <div className="profile-container">
            <div className="profile-name-picture">
              <div className="profile-picture">
                {profileData.profilePicture && (
                  <div
                    src={profileData.profilePicture}
                    style={{
                      backgroundImage: `url(${profileData.profilePicture})`,
                    }}
                    className="profile-picture-img"
                    alt="profile-pic"
                  ></div>
                )}
                {profileData.profilePicture === null && (
                  <div src={profilePic} alt="profile-pic"></div>
                )}
              </div>
              <div className="profile-details">
                <h3>{profileData.name}</h3>
                <h6>{profileData.email}</h6>
                {profileData.description && <p>{profileData.description}</p>}
              </div>
            </div>
            <div className="profile-skills-with-title">
              <h4>Skills</h4>
              <div className="profile-skills">
                {(profileData.skills == null ||
                  profileData.skills.length == 0) && (
                  <p>Most common skills: HTML, CSS, JAVA, JAVASCRIPT</p>
                )}
                {profileData.skills !== null &&
                  profileData.skills.map((skill_ob, i) => {
                    return <Skill skill_ob={skill_ob} key={i} user_id={user_id} />;
                  })}
              </div>
            </div>
            <div className="profile-education-with-title">
              <h4>Education and Courses</h4>
              <div className="profile-education">
                {(profileData.education == null ||
                  profileData.education.length == 0) && (
                  <p>Add education to your profile</p>
                )}
                {profileData.education &&
                  profileData.education.map((educ_ob, i) => {
                    return (
                      <Education educ_ob={educ_ob} key={i} user_id={user_id} />
                    );
                  })}
              </div>
            </div>
            <div className="profile-experience-with-title">
              <h4>Experience and Projects</h4>
              <div className="profile-experience">
                {(profileData.experience == null || profileData.experience.length == 0) && (
                  <p>Add experience to your profile</p>
                )}
                {profileData.experience &&
                  profileData.experience.map((exp_ob, i) => {
                    return (
                      <Experience
                        key={i}
                        exp_ob={exp_ob}
                        exp_key={exp_ob.id}
                        user_id={user_id}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="profile__cv">
            <Button variant="primary" target="_blank" href={profileData.cvpath}>
                Show CV
              </Button>
            </div>
          </div>
        </div>
      );
  }
}
