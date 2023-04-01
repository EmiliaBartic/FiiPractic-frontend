import React,{useState} from 'react'
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function PCV({fileURL,user_id,user__name}) {
  const [showAddCV, setShowAddCV] = useState(false);
  const handleCloseCV = (e) => setShowAddCV(false);
  const handleShowCV = (e) => setShowAddCV(true);
  const [newCV,setNewCV] = useState('');

  const handleChange = (e) => {
    setNewCV(e.target.files[0]);
  };

  const handleAddCV = (e) => {
    handleCloseCV();
    let client_id = user_id;
    let user_name = user__name;
    let user_access_token = localStorage.getItem("authToken");
    //console.log(newCV)
    if (newCV) {
      var formData = new FormData();
      formData.append("usercv", newCV);
      formData.append("client_id", client_id);
      formData.append("user_name", user_name);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_access_token}`,
        },
      };

      axios
        .post(process.env.REACT_APP_BASE_URL+"/api/profile/addCV/", formData, config)
        .then((response) => {
          //console.log(response);
        });
    }
  };

  return (
    <div className="profile__cv">
          <Button variant="success" onClick={handleShowCV}>
            Add CV
          </Button>

          <Button variant="primary" target="_blank" href={fileURL}>
            Show CV
          </Button>

        <Modal s show={showAddCV} onHide={handleCloseCV}>
        <Modal.Header closeButton>
        <Modal.Title>Add Your CV</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
        <form encType="multipart/form-data">
            <input
            type="file"
            id="inputCV"
            accept=".pdf,.docx"
            onChange={handleChange}
            />
        </form>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCV}>
            Close
        </Button>
        <Button variant="primary" onClick={handleAddCV}>
            Upload CV
        </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}


