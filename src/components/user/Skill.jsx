import React from "react";

import axios from "axios";

export default function Skill({
  skill_ob,
  user_id,
  setSkills,
  user_access_token,
}) {
  const handleDelete = () => {
    const skill_id = skill_ob.id;
    const config = {
      headers: { Authorization: `Bearer ${user_access_token}` },
    };

    axios
      .post(
        process.env.REACT_APP_BASE_URL+"/api/skills/deleteSkill",
        {
          skill_id,
          user_id,
        },
        config
      )
      .then((response) => {
        //reload
        const headers = {
          Authorization: `Bearer ${user_access_token}`,
        };
        axios
          .get(process.env.REACT_APP_BASE_URL+"/api/skills/getSkills", { headers })
          .then((response) => setSkills(response.data));
      })
      .catch((error) => {
        console.log(error);
        alert("Please log in again")
      });
  };

  return (
    <div className="skill-container">
      <h3>{skill_ob.skill}</h3>
      {/* <h5>{skill_ob.skill_rating}</h5> */}
      <div className="skill-buttons">
        {/* <Button variant="info" className='button-edit-skill'>E</Button> */}
        <button className="button-delete-skill" onClick={handleDelete}>
          {" "}
          x{" "}
        </button>
      </div>
    </div>
  );
}
