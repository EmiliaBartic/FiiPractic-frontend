import React, { useState } from "react";
import Experience from "./Experience";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function PExperience({
  user_id,
  experience,
  token,
  setExperience,
  usercv,
}) {
  const [experienceTitle, setExperienceTitle] = useState("");
  const [experienceCompany, setExperienceCompany] = useState("");
  const [experienceTime, setExperienceTime] = useState("");
  const [experienceLocation, setExperienceLocation] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");
  const [experienceRecommendation, setExperienceRecommendation] = useState("");
  const [showAddExperience, setShowAddExperience] = useState(false);
  const handleCloseExperience = (e) => setShowAddExperience(false);
  const handleShowExperience = (e) => setShowAddExperience(true);

  const [showRecommendation, setShowRecommendation] = useState(false);
  const handleCloseRecommendation = (e) => setShowRecommendation(false);
  const handleShowRecommendation = (e) => setShowRecommendation(true);

  const handleAddExperience = (e) => {
    setShowAddExperience(false);
    console.log(
      experienceTitle,
      experienceCompany,
      experienceTime,
      experienceLocation,
      experienceDescription
    );
    let client_id = user_id;
    if (
      experienceTitle &&
      experienceCompany &&
      experienceTime &&
      experienceLocation &&
      experienceDescription
    ) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/api/experience/addExperience",
          {
            experienceTitle,
            experienceCompany,
            experienceTime,
            experienceLocation,
            experienceDescription,
          },
          config
        )
        .then((response) => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          axios
            .get(
              process.env.REACT_APP_BASE_URL +
                "/api/experience/experienceForUser",
              { headers }
            )
            .then((response) => setExperience(response.data));
        })
        .catch((error) => {
          console.log(error);
          alert("Please log in again");
        });
    }
  };

  const handleSuggestExperience = () => {
    handleShowRecommendation();
    if (usercv != null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(
          process.env.REACT_APP_BASE_URL +
            "/api/experience/recommendExperience",
          config
        )
        .then((response) => {
          if (response.data == "log in again") alert("Please log in again");
          else {
            setExperienceRecommendation("");
            let newstring = response.data.replace(/(\r\n|\n|\r|:)/gm, " ");
            let string = newstring.replace(/\. /g, "\n");
            // /\n(\w+(\s)*)+(-|:)*(\s)*(\w+(\s)*)+(–)*\s(\w+(\s)*)(\d)*/g
            const regexp =
              /\n(\w+(\s)*)+(-)*(\s)+(\w+(\s)*)+(–)*\s(\w+(\s)*)(\d)*/gm;
            const matches = string.matchAll(regexp);
            for (const match of matches) {
              setExperienceRecommendation(experienceRecommendation => [...experienceRecommendation,match[0]]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Please log in again");
        });
    } else {
      alert("Introduce CV to suggest experience");
    }
  };

  return (
    <div className="profile-experience-with-title">
      <h4>Experience and Projects</h4>
      <div className="profile-experience">
        {(experience == null || experience.length == 0) && (
          <p>Add experience to your profile</p>
        )}
        {experience &&
          experience.map((exp_ob, i) => {
            return (
              <Experience
                key={i}
                exp_ob={exp_ob}
                exp_key={exp_ob.id}
                user_id={user_id}
                setExperience={setExperience}
                user_access_token={token}
              />
            );
          })}
      </div>
      <div className="profile-skills-buttons">
        <Button variant="success" onClick={handleShowExperience}>
          Add Experience
        </Button>
        <Button variant="info" onClick={handleSuggestExperience}>
          Suggest Experience
        </Button>
      </div>
      <Modal show={showAddExperience} onHide={handleCloseExperience}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <label>Experience Title</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="experienceTitle"
              value={experienceTitle}
              onChange={(e) => {
                setExperienceTitle(e.target.value);
              }}
            />
            <br></br>
            <label>Company or University</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="experienceCompany"
              value={experienceCompany}
              onChange={(e) => {
                setExperienceCompany(e.target.value);
              }}
            />
            <br></br>
            <label>Period of time </label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="experienceTime"
              value={experienceTime}
              onChange={(e) => {
                setExperienceTime(e.target.value);
              }}
            />
            <br></br>
            <label>Location</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="experienceLocation"
              value={experienceLocation}
              onChange={(e) => {
                setExperienceLocation(e.target.value);
              }}
            />
            <br></br>
            <label>Description</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="experienceDescription"
              value={experienceDescription}
              onChange={(e) => {
                setExperienceDescription(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExperience}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddExperience}>
            Add Experience
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRecommendation}
        onHide={handleCloseRecommendation}
        dialogClassName="wide-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add this experience to your profile: </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="experiences">
            {experienceRecommendation !== null &&
              experienceRecommendation.length > 0 &&
              experienceRecommendation.map((rec, i) => (
                <div key={i}>
                  <p>{rec}</p>
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRecommendation}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
