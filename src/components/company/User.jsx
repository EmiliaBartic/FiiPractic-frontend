import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function User({ info, company_id,setUserFromCompanyPerspective }) {
  const [emailContent, setEmailContent] = useState("");
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const handleCloseModal = (e) => setShowSendEmailModal(false);
  const handleShowModal = (e) => setShowSendEmailModal(true);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const sendEmail = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const emailFromId = company_id;
    const emailTo = info[2];
    if (emailContent) {
      handleCloseModal();
      axios
        .post(
          process.env.REACT_APP_BASE_URL+"/api/company/toUser/sendEmail",
          {
            emailContent,
            emailFromId,
            emailTo
          },
          headers
        )
        .then((response) => {
          console.log(response);
        });
    }
  };

  const handleShowUsersProfile = () =>{
    setUserFromCompanyPerspective(info['id']);
    navigate("/user-profile-for-company")  
  }

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  return (
    <div className="user-recommended">
      {info['matchScore']<50 && <h6 style={{color:'#FFA07A'}} >{info['matchScore']} %</h6>}
      {info['matchScore']>=50 && <h6 style={{color:'#228B22'}} >{info['matchScore']} % </h6>}
     
      <h4>{info['email']}</h4>
      <h6>{info['name']}</h6>
     
      <button onClick={handleShowModal}>Send email</button>
      {/* <button onClick={handleShowUsersProfile}>Show Profile</button> */}
      <Modal 
        show={showSendEmailModal}
        onHide={handleCloseModal}
        className="modal-bootstrap"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send email to {info['name']}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form encType="multipart/form-data">
            <label>Input for email:</label>
            <br></br>
            <textarea
              type="text"
              id="emailText"
              className="element-input"
              onChange={(e) => {
                setEmailContent(e.target.value);
              }}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={sendEmail}>
            Send email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}