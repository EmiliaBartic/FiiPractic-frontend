import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function LinkedInContainer({
  linkedInLink,
  setLinkedInLink,
  handleCloseLinkedIn,
  showAddLinkedIn,
  user_id,
  token,
}) {
  const isValidUrl = (link) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(link);
  };

  const handleAddLinkedIn = () => {
    handleCloseLinkedIn();
    let client_id = user_id;

    if (linkedInLink && isValidUrl(linkedInLink)) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/api/profile/addLinkedIn",
          {
            linkedInLink,
          },
          config
        )
        .then((response) => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios
            .get(process.env.REACT_APP_BASE_URL + "/api/profile/linkedInLink", {
              headers,
            })
            .then((response) => {
              console.log(response.data);
              setLinkedInLink(response.data.linkedInLink);
            });
        })
        .catch((error) => {
          console.log(error);
          alert("Please log in again");
        });
    } else {
      alert("Enter a valid url!");
    }
  };
  return (
    <div>
      {linkedInLink == null && (
        <p className="font-medium">Add a LinkedIn link to your profile</p>
      )}
      {linkedInLink && linkedInLink.length > 0 && (
        <Button variant="primary" className="mb-2">
          <div className="flex flex-row justify-center items-center m-auto">
            <FaLinkedin className="fa-2xl" />
            <a href={linkedInLink} className="no-underline text-white ml-3">
              {" "}
              My LinkedIn
            </a>
          </div>
        </Button>
      )}
      {/* linkedIn */}
      <Modal show={showAddLinkedIn} onHide={handleCloseLinkedIn}>
        <Modal.Header closeButton>
          <Modal.Title>Add LinkedIn</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <label>Add a link to yout LinkedIn Profile!</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="linkedInLink"
              value={linkedInLink}
              onChange={(e) => {
                setLinkedInLink(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLinkedIn}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddLinkedIn}>
            Add Link
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
