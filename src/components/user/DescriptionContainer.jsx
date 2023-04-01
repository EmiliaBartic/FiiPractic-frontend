import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
export default function DescriptionContainer({
  description,
  setDescription,
  showAddDescription,
  handleCloseDescription,
  user_id,
  token,
}) {
 

  const handleAddDescription = () => {
    handleCloseDescription();
    let client_id = user_id;
    if (description) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/api/profile/addDescription",
          {
            description,
          },
          config
        )
        .then((response) => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios
            .get(
              process.env.REACT_APP_BASE_URL + "/api/profile/getDescription",
              { headers }
            )
            .then((response) => {
              //console.log(response.data);
              setDescription(response.data.description);
              //console.log('descrieree',description);
            });
          //console.log(skills);
        })
        .catch((error) => {
          console.log(error);
          alert("Please log in again");
        });
    }
  };

  return (
    <div>
      {description == null && (
        <p className="font-medium">Add a description to your profile</p>
      )}
      {description && <h5 className="font-medium mb-3">{description}</h5>}

      {/* description */}
      <Modal show={showAddDescription} onHide={handleCloseDescription}>
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
