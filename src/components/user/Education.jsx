//scoli, cursuri doar titlu si perioada
//buton de add si delete
import React from 'react'
import axios from "axios";
export default function Education({ 
  educ_ob,
  setEducation,
  user_access_token
}) {

  const handleDeleteEduc = () =>{
    console.log('this delet');
    const client_education_id = educ_ob.id;
    const config = {
      headers: { Authorization: `Bearer ${user_access_token}` },
    };

    axios
      .post(
        process.env.REACT_APP_BASE_URL+"/api/education/deleteEducation",
        {
          client_education_id,
        },
        config
      )
      .then((response) => {
        //reload
        const headers = {
          Authorization: `Bearer ${user_access_token}`,
        };
        axios
          .get(process.env.REACT_APP_BASE_URL+"/api/education/education", { headers })
          .then((response) => setEducation(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="education-element-container">
    <h4>{educ_ob.edu_title}</h4>
    <div className='education-buttons-and-time'>
      <h6>{educ_ob.edu_time}</h6>
      <div className="educ-buttons">
        <button className="button-delete-educ" onClick={handleDeleteEduc}>
            {" "}
            x{" "}
        </button>
      </div>
    </div>
  </div>
  )
}
