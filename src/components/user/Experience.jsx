import {React, useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Experience = ({exp_ob,exp_key,setExperience,user_access_token}) => {
    const [isHovering, setIsHovering] = useState(false);
    //const [experience, setExperience] = useState([]);
    const [experienceTitle,setExperienceTitle] = useState(exp_ob.exp_title);
    const [experienceCompany, setExperienceCompany] = useState(exp_ob.exp_company);
    const [experienceTime, setExperienceTime] = useState(exp_ob.exp_time);
    const [experienceLocation, setExperienceLocation] = useState(exp_ob.exp_location);
    const [experienceDescription, setExperienceDescription] = useState(exp_ob.exp_description);

    const [showEditExperience,setShowEditExperience] = useState(false);
    const handleCloseEditExperience = (e) => setShowEditExperience(false);
    const handleShowEditExperience = (e) => setShowEditExperience(true);

    function setClickHover(){
        setIsHovering(!isHovering);
    }

    const handleEditExperience = (e)=>{
        setShowEditExperience(false);
        let exp_key_copy = exp_key;
        const config = {
            headers: { Authorization: `Bearer ${user_access_token}` },
        };

          axios
          .post(
            process.env.REACT_APP_BASE_URL+"/api/experience/editExperience",
            {
              exp_key_copy,
              experienceTitle,
              experienceCompany,
              experienceTime,
              experienceLocation,
              experienceDescription
            },
            config
          )
          .then((response) => {
            const headers = {
              Authorization: `Bearer ${user_access_token}`,
            };
            axios
              .get(process.env.REACT_APP_BASE_URL+"/api/experience/experienceForUser/", { headers })
              .then((response) => setExperience(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const handleDeleteExperience = (e) =>{
        let exp_key_copy = exp_key;

          const config = {
            headers: { Authorization: `Bearer ${user_access_token}` },
          };
        
          axios
          .post(
            process.env.REACT_APP_BASE_URL+"/api/experience/deleteExperience",
            {
              experience_id : exp_key_copy
            },
            config
          )
          .then((response) => {
            const headers = {
              Authorization: `Bearer ${user_access_token}`,
            };
            axios
              .get(process.env.REACT_APP_BASE_URL+"/api/experience/experienceForUser/", { headers })
              .then((response) => setExperience(response.data));
           
          })
          .catch((error) => {
            console.log(error);
          });
    
    }

    return (
        <div className="experience-element-container" key={exp_key}>
            <h4>{exp_ob.exp_title} - {exp_ob.exp_company}</h4>
            <div className="experience-element-container-details">
                <h6>{exp_ob.exp_time} , {exp_ob.exp_location}</h6>
                {isHovering && (
                    <div>
                        <h6>{exp_ob.exp_description}</h6>
                    </div>
                )}
                <div className='experience-element-container-details-bottom'>
                    <button className='full-rounded-btn' onClick={setClickHover}>D</button>
                    <button className='exp-delete-btn' onClick={handleDeleteExperience}>X</button>
                    <button className='exp-edit-btn' onClick={handleShowEditExperience}>E</button>
                </div>
            </div>
            <Modal show={showEditExperience} onHide={handleCloseEditExperience}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Experience</Modal.Title>
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
                <Button variant="secondary" onClick={handleCloseEditExperience}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditExperience}>
                    Edit Experience
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

        
    );
}

export default Experience;
