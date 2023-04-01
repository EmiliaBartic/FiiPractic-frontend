import React, { useState } from "react";
import Skill from "./Skill";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function PSkills({
  skills,
  setSkills,
  user_idd,
  token,
  usercv,
  contentLoading,
}) {
  const [showAddSkill, setShowAddSkill] = useState(false);
  const handleClose = (e) => setShowAddSkill(false);
  const handleShow = (e) => setShowAddSkill(true);
  const [showRecomSkills, setShowRecomSkills] = useState(false);
  const handleCloseRSkills = (e) => setShowRecomSkills(false);
  const handleShowRSkills = (e) => setShowRecomSkills(true);
  const [recom_skills, setRecomSkills] = useState(["no skills"]);
  const [skillTitle, setSkillTitle] = useState("");

  const handleAddSkill = () => {
    setShowAddSkill(false);
    let client_id = user_idd;

    if (skillTitle) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          process.env.REACT_APP_BASE_URL+"/api/skills/addSkill",
          {
            skillTitle,
          },
          config
        )
        .then((response) => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          axios
            .get(process.env.REACT_APP_BASE_URL+"/api/skills/getSkills", { headers })
            .then((response) => setSkills(response.data));
          //console.log(skills);
        })
        .catch((error) => {
          console.log(error);
          alert("Please log in again")
        });
    }
  };

  const handleSuggestSkills = (e) => {
    handleShowRSkills();
   
    if (usercv != null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get( process.env.REACT_APP_BASE_URL+"/api/skills/recommendSkillsForUser", config)
        .then((response) => {
          //console.log(response);
          if(response.data == "log in again")
                alert("Please log in again")
          else setRecomSkills(response.data);
        })
        .catch((error) => {
          console.log(error)
          alert("Please log in again")
        });
      
    } else {
      alert("Introduce CV to suggest skills");
    }
  };

  return (
    <div className="profile-skills-with-title">
      <h4>Skills</h4>

      <div className="profile-skills">
        {(skills == null || skills.length == 0) && (
          <p>Most common skills: HTML, CSS, JAVA, JAVASCRIPT</p>
        )}
        {skills !== null &&
          skills.map((skill_ob, i) => {
            return (
              <Skill
                skill_ob={skill_ob}
                key={i}
                user_id={user_idd}
                setSkills={setSkills}
                user_access_token={token}
              />
            );
          })} 
      </div>
      <div className="profile-skills-buttons">
        <Button variant="success" onClick={handleShow}>
          Add Skill
        </Button>

        <Button variant="info" onClick={handleSuggestSkills}>
          Suggest Skills
        </Button>
      </div>

      <Modal  show={showAddSkill} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add skill</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="selection-skills">
            <p>Android</p>

            <label>
              <input
                type="radio"
                value={"java"}
                name="skill"
                onClick={() => setSkillTitle("java")}
              />{" "}
              Java
            </label>
            <label>
              <input
                type="radio"
                value={"kotlin"}
                name="skill"
                onClick={() => setSkillTitle("kotlin")}
              />{" "}
              Kotlin
            </label>

            <p>iOS</p>
            <label>
              <input
                type="radio"
                value={"objective c"}
                name="skill"
                onClick={() => setSkillTitle("objective c")}
              />{" "}
              Objective c
            </label>
            <label>
              <input
                type="radio"
                value={"swift"}
                name="skill"
                onClick={() => setSkillTitle("swift")}
              />{" "}
              Swift
            </label>

            <p>Cross Platform</p>
            <label>
              <input
                type="radio"
                value={"react native"}
                name="skill"
                onClick={() => setSkillTitle("react native")}
              />{" "}
              React Native
            </label>
            <label>
              <input
                type="radio"
                value={"flutter"}
                name="skill"
                onClick={() => setSkillTitle("flutter")}
              />{" "}
              Flutter
            </label>
            <label>
              <input
                type="radio"
                value={"ionic"}
                name="skill"
                onClick={() => setSkillTitle("ionic")}
              />{" "}
              Ionic
            </label>
            <label>
              <input
                type="radio"
                value={"cordova"}
                name="skill"
                onClick={() => setSkillTitle("cordova")}
              />{" "}
              Cordova
            </label>

            <p>Programming Languages and Frameworks</p>
            <label>
              <input
                type="radio"
                value={"C/C++"}
                name="skill"
                onClick={() => setSkillTitle("C/C++")}
              />{" "}
              C/C++
            </label>
            <label>
              <input
                type="radio"
                value={"javascript"}
                name="skill"
                onClick={() => setSkillTitle("javascript")}
              />{" "}
              Javascript
            </label>
            <label>
              <input
                type="radio"
                value={"express"}
                name="skill"
                onClick={() => setSkillTitle("express")}
              />{" "}
              Express JS
            </label>
            <label>
              <input
                type="radio"
                value={"ruby"}
                name="skill"
                onClick={() => setSkillTitle("ruby")}
              />{" "}
              Ruby
            </label>
            <label>
              <input
                type="radio"
                value={"php"}
                name="skill"
                onClick={() => setSkillTitle("php")}
              />{" "}
              Php
            </label>
            <label>
              <input
                type="radio"
                value={"laravel"}
                name="skill"
                onClick={() => setSkillTitle("laravel")}
              />{" "}
              Laravel
            </label>
            <label>
              <input
                type="radio"
                value={"python"}
                name="skill"
                onClick={() => setSkillTitle("python")}
              />{" "}
              Python
            </label>
            <label>
              <input
                type="radio"
                value={"django"}
                name="skill"
                onClick={() => setSkillTitle("django")}
              />{" "}
              Django
            </label>
            <label>
              <input
                type="radio"
                value={"flask"}
                name="skill"
                onClick={() => setSkillTitle("flask")}
              />{" "}
              Flask
            </label>
            <label>
              <input
                type="radio"
                value={"scala"}
                name="skill"
                onClick={() => setSkillTitle("scala")}
              />{" "}
              Scala
            </label>
            <label>
              <input
                type="radio"
                value={".net"}
                name="skill"
                onClick={() => setSkillTitle(".net")}
              />{" "}
              .Net
            </label>
            <label>
              <input
                type="radio"
                value={"angular"}
                name="skill"
                onClick={() => setSkillTitle("angular")}
              />{" "}
              Angular
            </label>
            <label>
              <input
                type="radio"
                value={"react js"}
                name="skill"
                onClick={() => setSkillTitle("react js")}
              />{" "}
              React JS
            </label>
            <label>
              <input
                type="radio"
                value={"vue"}
                name="skill"
                onClick={() => setSkillTitle("vue")}
              />{" "}
              Vue
            </label>

            <p>Other Web Technologies</p>
            <label>
              <input
                type="radio"
                value={"html"}
                name="skill"
                onClick={() => setSkillTitle("html")}
              />{" "}
              HTML
            </label>
            <label>
              <input
                type="radio"
                value={"css"}
                name="skill"
                onClick={() => setSkillTitle("css")}
              />{" "}
              CSS
            </label>
            <label>
              <input
                type="radio"
                value={"sass"}
                name="skill"
                onClick={() => setSkillTitle("sass")}
              />{" "}
              SASS
            </label>
            <label>
              <input
                type="radio"
                value={"tailwind"}
                name="skill"
                onClick={() => setSkillTitle("tailwind")}
              />{" "}
              Tailwind
            </label>
            <p>Database Tech</p>
            <label>
              <input
                type="radio"
                value={"mysql"}
                name="skill"
                onClick={() => setSkillTitle("mysql")}
              />{" "}
              Mysql
            </label>
            <label>
              <input
                type="radio"
                value={"postgres"}
                name="skill"
                onClick={() => setSkillTitle("postgres")}
              />{" "}
              Postgres
            </label>
            <label>
              <input
                type="radio"
                value={"sqlite"}
                name="skill"
                onClick={() => setSkillTitle("sqlite")}
              />{" "}
              Sqlite
            </label>
            <label>
              <input
                type="radio"
                value={"mongo db"}
                name="skill"
                onClick={() => setSkillTitle("mongo db")}
              />{" "}
              Mongo DB
            </label>
            <label>
              <input
                type="radio"
                value={"cassandra"}
                name="skill"
                onClick={() => setSkillTitle("cassandra")}
              />{" "}
              Cassandra
            </label>
            <label>
              <input
                type="radio"
                value={"redis"}
                name="skill"
                onClick={() => setSkillTitle("redis")}
              />{" "}
              Redis
            </label>

            <p>Cloud Service Providers</p>
            <label>
              <input
                type="radio"
                value={"AWS"}
                name="skill"
                onClick={() => setSkillTitle("AWS")}
              />{" "}
              AWS
            </label>
            <label>
              <input
                type="radio"
                value={"firebase"}
                name="skill"
                onClick={() => setSkillTitle("firebase")}
              />{" "}
              Firebase
            </label>
            <label>
              <input
                type="radio"
                value={"azure"}
                name="skill"
                onClick={() => setSkillTitle("azure")}
              />{" "}
              Microsoft (Azure)
            </label>

            <p>DevOps</p>
            <label>
              <input
                type="radio"
                value={"docker"}
                name="skill"
                onClick={() => setSkillTitle("docker")}
              />{" "}
              Docker
            </label>
            <label>
              <input
                type="radio"
                value={"kubernetes"}
                name="skill"
                onClick={() => setSkillTitle("kubernetes")}
              />{" "}
              Kubernetes
            </label>
            <label>
              <input
                type="radio"
                value={"github"}
                name="skill"
                onClick={() => setSkillTitle("github")}
              />{" "}
              Github
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal  show={showRecomSkills} onHide={handleCloseRSkills}>
        <Modal.Header closeButton>
          <Modal.Title>Add these skills to your profile: </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            {(recom_skills==undefined || recom_skills=="no cv uploaded" ) && <p>Upload CV to get recommendations</p> }
            {recom_skills && recom_skills!=undefined && recom_skills!="no cv uploaded" && recom_skills.length!==0 && (
              <>
                <h5 style={{ color: "green" }}>Hard skills from CV:</h5>
                {recom_skills && recom_skills!=undefined && recom_skills.length!==0 && recom_skills.map((exp_ob, i) => {
                  if (exp_ob !== "space") {
                    return <h6 key={exp_ob}>{exp_ob}</h6>;
                  } else {
                    return (
                      <h5 style={{ color: "green" }} key={i}>
                        Soft skills:
                      </h5>
                    );
                  }
                })}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRSkills}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
