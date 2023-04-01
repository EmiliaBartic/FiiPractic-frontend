import React, { useState } from "react";
import { Modal,Button } from "react-bootstrap";

import axios from "axios";

export default function CompanyProfileDescription({ description, setDescription,user_id }) {
  const [showAddDescription, setShowAddDescription] = useState(false);
  const handleCloseDescription = (e) => setShowAddDescription(false);
  const handleShowDescription = (e) => setShowAddDescription(true);
  const token = localStorage.getItem("authToken");

  const handleAddDescription = () => {
    setShowAddDescription(false);
    let client_id = user_id;
    if (description) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL+"/api/profile/addDescription",
          {
            description,
          },
          config
        )
        .then((response) => {
          console.log(response);
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          axios.get(process.env.REACT_APP_BASE_URL+"/api/profile/getDescription/", { headers }).then((response) => {
            //console.log(response.data);
            setDescription(response.data[0].description);
            //console.log('descrieree',description);
          });
          //console.log(skills);
        })
        .catch((error) => {
          console.log(error);
          alert("Please log in again")
        });
    }
  };

  return (
    <div>
      <div className="profile-description">
        <p>{description}</p>
        <Button variant="primary" onClick={handleShowDescription}>
          Add/Edit Description
        </Button>
      </div>

      <Modal 
        show={showAddDescription}
        onHide={handleCloseDescription}
        dialogClassName="modal-cls"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Description</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <label>Add a suitable description for yourself!</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDescription}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDescription}>
            Add Description
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
