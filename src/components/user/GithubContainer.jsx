import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
export default function GithubContainer({
  githubLink,
  setGithubLink,
  showAddGithub,
  user_id,
  token,
  handleCloseGithub,
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
  const handleAddGithub = () => {
    handleCloseGithub();
    let client_id = user_id;

    if (githubLink && isValidUrl(githubLink)) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/api/profile/addGithub",
          {
            githubLink,
          },
          config
        )
        .then((response) => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios
            .get(process.env.REACT_APP_BASE_URL + "/api/profile/githubLink", {
              headers,
            })
            .then((response) => {
              console.log(response.data);
              setGithubLink(response.data.githubLink);
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
      {githubLink == null && (
        <p className="font-medium">Add a Github link to your profile</p>
      )}
      {githubLink && githubLink.length > 0 && (
        <Button variant="dark" className="mb-3">
          <div className="flex flex-row justify-center items-center m-auto">
            <FaGithub className="fa-2xl" />
            <a href={githubLink} className="no-underline text-white ml-3">
              {" "}
              My Github
            </a>
          </div>
        </Button>
      )}
      {/* github */}
      <Modal show={showAddGithub} onHide={handleCloseGithub}>
        <Modal.Header closeButton>
          <Modal.Title>Add Github</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <label>Add a link to yout Github Profile!</label>
            <br></br>
            <input
              className="w-full"
              type="text"
              required
              name="githubLink"
              value={githubLink}
              onChange={(e) => {
                setGithubLink(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGithub}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddGithub}>
            Add Link
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
