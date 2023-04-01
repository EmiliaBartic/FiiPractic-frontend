import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import profilePic from "../../images/default-profile-picture.png";
import ContentLoader from "react-content-loader";

export default function CompanyProfilePicture({
  pictureURL,
  setPictureURL,
  company_name,
  company_email,
  company_id,
  contentLoading,
}) {
  const [companyPicture, setCompanyPicture] = useState([]);
  const [showAddPictureModal, setShowAddPictureModal] = useState(false);
  const handleClosePictureModal = (e) => setShowAddPictureModal(false);
  const handleShowPictureModal = (e) => setShowAddPictureModal(true);
  const handleAddProfilePicture = () => {
    handleClosePictureModal();
    let client_id = company_id;
    let companyName = company_name;
    let user_access_token = localStorage.getItem("authToken");

    if (companyPicture) {
      var formData = new FormData();
      formData.append("companyPicture", companyPicture);
      formData.append("company_id", client_id);
      formData.append("company_name", companyName);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_access_token}`,
        },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL+"/api/company/picture/store/",
          formData,
          config
        )
        .then((response) => {
          const headers = {
            Authorization: `Bearer ${user_access_token}`,
          };
          axios.get(process.env.REACT_APP_BASE_URL+"/api/company/picture", { headers }).then((response) => {
            console.log(response.data);
            setCompanyPicture(response.data);
            setPictureURL(response.data);
            window.location.reload(false);
          });
        });
    }
  };
 

  if (contentLoading) {
    return (
      <div className="profile-name-picture">
        <div className="profile-picture">
          <ContentLoader
            speed={2}
            width={"100%"}
            height={"100%"}
            viewBox="0 0 250 250"
            backgroundColor="#7186eb"
            foregroundColor="#8f9fef"
          >
            <circle cx="125" cy="100" r="100" />
          </ContentLoader>
        </div>
        <div className="profile-details">
          <ContentLoader
            speed={2}
            width={"100%"}
            height={"100%"}
            viewBox="0 0 250 100"
            backgroundColor="#7186eb"
            foregroundColor="#8f9fef"
          >
            <rect x="25" y="88" rx="3" ry="3" width="200" height="6" />
          </ContentLoader>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-name-picture">
        <div className="profile-picture">
          {pictureURL && (
            <div
              src={pictureURL}
              style={{ backgroundImage: `url(${pictureURL})` }}
              className="profile-picture-img"
              alt="profile-pic"
            ></div>
          )}
          {pictureURL === null && (
            <div src={profilePic} alt="profile-pic"></div>
          )}
          <button onClick={handleShowPictureModal}>
            <FaCamera className="faCameraProfile" />
          </button>
        </div>
        <div className="profile-details">
          <h3>{company_name}</h3>
          <h6>{company_email}</h6>
        </div>
        <Modal  show={showAddPictureModal} onHide={handleClosePictureModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Modify your profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <form encType="multipart/form-data">
              <input
                type="file"
                id="inputProfilePicture"
                accept="image/*"
                onChange={(e) => {
                  setCompanyPicture(e.target.files[0]);
                }}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePictureModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProfilePicture}>
              Upload picture
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
