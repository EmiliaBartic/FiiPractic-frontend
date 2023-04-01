import React,{useState} from 'react'
import Education from './Education';
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function PEducation({education,setEducation,user_id,token}) {
    const [showAddEducation,setShowAddEducation] = useState(false);
    const handleCloseEducation = (e) => setShowAddEducation(false);
    const handleShowEducation = (e) => setShowAddEducation(true);
    const [eduTitle, setEduTitle] = useState("");
    const [eduTime, setEduTime] = useState("");
    const handleAddEducation = (e)=>{
        setShowAddEducation(false);
        
        let client_id = user_id;
        if(eduTitle && eduTime){
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
        
          axios
          .post(
            process.env.REACT_APP_BASE_URL+"/api/education/addEducation",
            {
              eduTitle,
              eduTime
            },
            config
          )
          .then((response) => {    
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            axios
              .get(process.env.REACT_APP_BASE_URL+"/api/education/education/", { headers })
              .then((response) => setEducation(response.data));
           
          })
          .catch((error) => {
            console.log(error);
            alert("Please log in again")
          });
    
        }
      };
  return (
    <div className="profile-education-with-title">
        <h4>Education and Courses</h4>
        <div className="profile-education">
        {(education == null || education.length == 0) && (
          <p>Add education to your profile</p>
        )}
            {education && education.map((educ_ob,i) => {
            return (
                <Education
                educ_ob={educ_ob}
                key={i}
                user_id={user_id}
                setEducation={setEducation}
                user_access_token={token}
                />
            );
            })}
        
        </div>
        <Button variant="success" onClick={handleShowEducation}>
        Add Education
        </Button>

        <Modal  show={showAddEducation} onHide={handleCloseEducation}>
            <Modal.Header closeButton>
            <Modal.Title>Add Education</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
            <div>
                <label>Education</label>
                <br></br>
                <input
                className="w-full"
                type="text"
                required
                name="edu_title"
                value={eduTitle}
                onChange={(e) => {
                    setEduTitle(e.target.value);
                }}
                />
                <br></br>
                <label>Period of time </label>
                <br></br>
                <input
                className="w-full"
                type="text"
                required
                name="edu_time"
                value={eduTime}
                onChange={(e) => {
                    setEduTime(e.target.value);
                }}
                />
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEducation}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddEducation}>
                Add Education
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
