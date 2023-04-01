import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Jobs from "../general/Jobs";

export default function Companies({
  companies,
  handleFollowCompany,
  handleUNFollowCompany,
  companiesFollowedByUser,
}) {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState(0);
  const token = localStorage.getItem("authToken");
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  let jobsPictures = [];
  const handleCloseModal = (e) => {
    setShowCompanyModal(false);
    setJobs([]);
    setCompanyName("");
  };
  const handleShowModal = (e) => setShowCompanyModal(true);

  function showModalForCompany(c) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (jobs.length === 0) {
      let url = process.env.REACT_APP_BASE_URL+"/api/company/jobs/";
      let result = url + c.id;

      axios.get(result, { headers }).then((response) => {
        if (
          response.data !== undefined &&
          response.data !== null &&
          response.data !== jobs
        ) {
          setJobs(response.data);
          console.log("jobs:", jobs);
        } else {
          console.log("Eronat", response.data);
        }
      });

      handleShowModal();
    }
  }

  function update(c) {
    if (jobs.length > 0) {
      for (let i = 0; i < jobs.length; i++) {
        jobsPictures.push(c.profile_picture);
      }
      return jobsPictures;
    }
  }

  function findElementById(c_id) {
    if (c_id != 0) {
      var found = false;
      companiesFollowedByUser.forEach((company) => {
        if (c_id == company.id) found = true;
      });
      return found;
    }
  }

  return (
    <div className="companies">
      {companies !== null &&
        companies.length > 0 &&
        companies.map((c, i) => (
          <div key={i} className="companies__container">
            <a
              className="companyName"
              onClick={() => {
                setCompanyName(c.name);
                setCompanyId(c.id);
                showModalForCompany(c);
              }}
              key={i}
            >
              {c.name}
            </a>
            <Modal
            
              show={showCompanyModal}
              onHide={handleCloseModal}
              dialogClassName="modal-cls"
            >
              <Modal.Header closeButton>
                <Modal.Title>{companyName}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                {(jobs === undefined || jobs === null || jobs.length == 0) && (
                  <p>No jobs for this company</p>
                )}
                {/* {console.log("c:", c)} */}
                {jobs !== undefined &&
                  jobs !== null &&
                  jobs.length > 0 &&
                  (update(c),
                  (
                    <Jobs
                      jobs={jobs}
                      jobsPictures={jobsPictures}
                      isCompany={false}
                      is_saved={false}
                      loaded_from_db={false}
                    />
                  ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                {!findElementById(companyId) && (
                  <Button
                    variant="primary"
                    onClick={() => handleFollowCompany(companyId)}
                  >
                    Follow company
                  </Button>
                )}
                {findElementById(companyId) && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleUNFollowCompany(companyId);
                    }}
                  >
                    Unfollow company
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </div>
        ))}
    </div>
  );
}
