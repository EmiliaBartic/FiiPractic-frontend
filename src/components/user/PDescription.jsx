import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub, FaLinkedin } from "react-icons/fa";


import "../../styles/profile.css";
import DescriptionContainer from "./DescriptionContainer";
import LinkedInContainer from "./LinkedInContainer";
import GithubContainer from "./GithubContainer";

export default function PDescription({
  description,
  setDescription,
  linkedInLink,
  setLinkedInLink,
  githubLink,
  setGithubLink,
  user_id,
  token,
}) {
  const [showAddDescription, setShowAddDescription] = useState(false);
  const handleCloseDescription = (e) => setShowAddDescription(false);
  const handleShowDescription = (e) => setShowAddDescription(true);
 
  const [showAddLinkedIn, setShowAddLinkedIn] = useState(false);
  const handleCloseLinkedIn = (e) => setShowAddLinkedIn(false);
  const handleShowLinkedIn = (e) => setShowAddLinkedIn(true);

  const [showAddGithub, setShowAddGithub] = useState(false);
  const handleCloseGithub = (e) => setShowAddGithub(false);
  const handleShowGithub = (e) => setShowAddGithub(true);
  

  return (
    <div className="profile-description">
      <DescriptionContainer description={description} setDescription={setDescription} user_id={user_id} token={token} showAddDescription={showAddDescription} handleCloseDescription={handleCloseDescription} />
     
      <LinkedInContainer linkedInLink={linkedInLink} setLinkedInLink={setLinkedInLink} showAddLinkedIn={showAddLinkedIn} user_id={user_id} token={token} handleCloseLinkedIn={handleCloseLinkedIn}/>

      <GithubContainer githubLink={githubLink} setGithubLink={setGithubLink} showAddGithub={showAddGithub} user_id={user_id} token={token} handleCloseGithub={handleCloseGithub} />
      
      <div className="flex flex-row w-full justify-evenly items-center">
        <Button variant="dark" onClick={handleShowGithub}>
          Add/Edit Github Link
        </Button>
        <Button variant="success" onClick={handleShowDescription}>
          Add/Edit Description
        </Button>
        <Button variant="primary" onClick={handleShowLinkedIn}>
          Add/Edit LinkedInLink
        </Button>
      </div>
    </div>
  );
}
