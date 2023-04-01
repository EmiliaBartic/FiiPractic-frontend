import React, { useState } from "react";
import "../../styles/job.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import Tags from "../company/Tags";


const Job = ({
  key_j,
  title,
  id,
  company,
  city,
  country,
  description,
  level,
  requirements,
  responsibilities,
  skills,
  tags,
  companyPicture,
  type,
  workTime,
  isCompany,
  isSaved,
  setSavedJobs,
}) => {
  


  const [showJob, setShowJob] = useState(false);
  const [showText, setShowText] = useState(false);
  const [randomNr, setRandomNr] = useState(0);

  const handleClose = (e) => {
    //e.preventDefault();
    setShowJob(false);
    setShowText(false);
  };
  const handleShow = (e) => {
    //e.preventDefault();
    setShowJob(true);
    setTimeout(() => {
      setShowText(true);
      setRandomNr(Math.floor(Math.random() * 10));
    }, "5000");
  };
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("authToken");

  let tags_arr = tags.split(",");
  let skills_arr = skills.split(",");
  const handleDeleteJob = () => {
    const job_id = id;
    const user_id = user.name;
    const user_access_token = token;
    const config = {
      headers: { Authorization: `Bearer ${user_access_token}` },
    };

    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/jobs/deleteJob",
        {
          job_id,
          user_id,
        },
        config
      )
      .then((response) => {
        window.location.reload();
      });
  };
  const saveJob = () => {
    let job_id = id;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/jobs/saveJob",
        {
          job_id,
        },
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const unSaveJob = () => {
    let job_id = id;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/jobs/deleteSavedJob",
        {
          job_id,
        },
        config
      )
      .then((response) => {
        console.log(response);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(process.env.REACT_APP_BASE_URL + "/api/jobs/savedJobs", {
            headers,
          })
          .then((response) => setSavedJobs(response.data));
      })
      .catch((error) => {
        console.log(error);
        alert("Please log in again");
      });
  };

  if (isCompany) {
    return (
      <div className="job-container">
        <div className="job-image-container">
          <img
            src={companyPicture}
            className="company-logo"
            alt="company logo"
          />
        </div>
        <div className="job-details">
          <h3>{title}</h3>
          <h6>{company}</h6>
          <h6>
            {city}, {country}
          </h6>
          <div className="job-actions" key={key_j}>
            <button className="job-details-btn" onClick={handleShow}>
              Details
            </button>
            <button className="job-save" onClick={handleDeleteJob}>
              Delete
            </button>
          </div>
        </div>

        <Modal show={showJob} onHide={handleClose} dialogClassName="modal-cls">
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="modal-cls--title">
                <FontAwesomeIcon icon={faSuitcase} /> {title}
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <div className="modal-body--location">
              {company} - {city} , {country}{" "}
            </div>
            <div className="modal-body--level">
              <FontAwesomeIcon icon={faSuitcase} id="faSuitcase" />
              Level {level}
            </div>
            <div className="modal-body--level">
              <FontAwesomeIcon icon={faSuitcase} id="faSuitcase" />
              Type {type}
            </div>
            <div className="modal-body--level">
              <FontAwesomeIcon icon={faSuitcase} id="faSuitcase" />
              {workTime}
            </div>
            <Tags tags={tags} city={city} />

            <div className="modal-body--level">
              <h4>
                <FontAwesomeIcon icon={faSuitcase} id="faSuitcase" />
                Responsibilities
              </h4>
              <p>{responsibilities}</p>
            </div>

            <div className="modal-body--level">
              <h4>
                <FontAwesomeIcon icon={faSuitcase} id="faSuitcase" />
                Description
              </h4>
              <p>{description}</p>
            </div>

            <div className="modal-body--level">
              <h4>
                <FontAwesomeIcon icon={faSuitcase} id="faSuitcase" />
                Requirements
              </h4>
              <p>{requirements}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="job-container" key={key_j}>
        <div className="job-image-container">
          <img
            src={companyPicture}
            className="company-logo"
            alt="company logo"
          />
        </div>
        <div className="job-details">
          <h4>{title}</h4>
          <h6>{company}</h6>
          <h6>
            {city}, {country}
          </h6>
          <div className="job-actions" key={key_j}>
            <button className="job-details-btn" onClick={handleShow}>
              Details
            </button>
            {
              !isSaved && <button className="job-save" onClick={saveJob}>
              Save
            </button>
            }
            
            {isSaved && (
              <button className="job-save" onClick={unSaveJob}>
                Delete Save
              </button>
            )}
          </div>
        </div>

        <Modal show={showJob} onHide={handleClose} dialogClassName="modal-cls">
          <Modal.Header closeButton>
            <Modal.Title>
              {company} , {title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <div className="modal-div">
              <h5>Level</h5>
              <p>{level}</p>
            </div>

            <div className="modal-long-div">
              <h5>Tags</h5>
              <div className="tags-modal-body">
                {tags_arr.map((tag, i) => {
                  return (
                    <button className="tag-job" key={i}>
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="modal-div">
              <h5>Type </h5>
              <p>{type}</p>
            </div>
            <div className="modal-div">
              <h5>Time</h5>
              
              <p>{workTime}</p>
            </div>
            <div className="modal-long-div">
              <h5>Responsibilities</h5>
              <div className="bordered-div">{responsibilities}</div>
            </div>
            <div className="modal-long-div">
              <h5>Description</h5>
              <div className="bordered-div">{description}</div>
            </div>
            <div className="modal-long-div">
              <h5>Requirements</h5>
              <div className="bordered-div">{requirements}</div>
            </div>
            <div className="modal-long-div">
              <h5>Skills</h5>
              <div className="tags-modal-body">
                {skills_arr.map((tag, i) => {
                  return (
                    <button className="tag-job" key={i}>
                      {tag}
                    </button>
                  );
                })}
              </div>
              {
                showText &&
                <h3 className="text-danger">Careful! {randomNr} more users are looking at this job</h3>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
       
      </div>
    );
  }
};

export default Job;
