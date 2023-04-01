import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../../styles/companyRegister.css";
import "../../styles/addJob.css";
import CNavbar from '../../components/company/CNavBar-log';
import Message from "../../components/general/Message";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [workType, setWorkType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const [skills, setSkills] = useState([]);
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      // remove from skills array
      setSkills(skills.filter((item) => item != skill));
      setTags(skills.filter((item) => item != skill))
    } else {
      // add to skills array
      setSkills([...skills, skill]);
      setTags([...skills,skill]);
    }
  };


  const handleAddJob = () => {
    let skillsString = "";
    let tagsString = "";
   
    if (skills.length > 0) {
      for (let i = 0; i < skills.length; i++){
        if(i == skills.length - 1){
           skillsString += skills[i];
        } else {
           skillsString += (skills[i] + ", ");
        }
      }
      tagsString = skillsString+", "+city;
        
      console.log(       title +" "+
        skillsString +" "+
        tagsString +" "+
        city +" "+
        workType +" "+
        country +" "+
        level +" "+
        workTime +" "+
        requirements +" "+
        responsibilities)
      if (
        title &&
        skillsString &&
        city &&
        workType &&
        country &&
        level &&
        workTime &&
        requirements &&
        responsibilities
      ) {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const user_json = JSON.parse(localStorage.getItem("user"));
        const user_name = user_json["name"];
       // const user_id = user_json["id"];
        axios
          .post(
            process.env.REACT_APP_BASE_URL+"/api/jobs/addJob",
            {
              title,
              skills: skillsString,
              tags: tagsString,
              city,
              country,
              level,
              workTime,
              workType,
              requirements,
              description,
              responsibilities,
              user_name,
            },
            config
          )
          .then((response) => {
            console.log(response);
            setMessage("Job added");
            setMsgType("ok");
            setShowMessage(true);
          })
          .catch((error) => {
            setMessage(error);
            setMsgType("error");
            setShowMessage(true);
          });
      }
    }
  };

  return (
    <div>
      <CNavbar  />
      <div className="addJobContainer">
        <h4>Add a Job</h4>
        <div className="addJobContainer__form">
          <div className="addJobContainer__form__element">
            <label className="title_label">Title</label>
            <input
              type="text"
              id="job_title"
              value={title}
              className="element-input"
              onInput={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <small id="smallTitle"></small>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Skills</label>
            <div className="selection-skills">
              <div className="skills-division-with-title">
                <p>Android</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"java"}
                      name="skill"
                      onClick={() => toggleSkill("java")}
                    />{" "}
                    Java
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"kotlin"}
                      name="skill"
                      onClick={() => toggleSkill("kotlin")}
                    />{" "}
                    Kotlin
                  </label>
                </div>
              </div>

              <div className="skills-division-with-title">
                <p>iOS</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"objective c"}
                      name="skill"
                      onClick={() => toggleSkill("objective c")}
                    />{" "}
                    Objective c
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"swift"}
                      name="skill"
                      onClick={() => toggleSkill("swift")}
                    />{" "}
                    Swift
                  </label>
                </div>
              </div>
              <div className="skills-division-with-title">
                <p>Cross Platform</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"react native"}
                      name="skill"
                      onClick={() => toggleSkill("react native")}
                    />{" "}
                    React Native
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"flutter"}
                      name="skill"
                      onClick={() => toggleSkill("flutter")}
                    />{" "}
                    Flutter
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"dart"}
                      name="skill"
                      onClick={() => toggleSkill("dart")}
                    />{" "}
                    Dart
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"ionic"}
                      name="skill"
                      onClick={() => toggleSkill("ionic")}
                    />{" "}
                    Ionic
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"cordova"}
                      name="skill"
                      onClick={() => toggleSkill("cordova")}
                    />{" "}
                    Cordova
                  </label>
                </div>
              </div>
              <div className="skills-division-with-title">
                <p>Programming Languages and Frameworks</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"C/C++"}
                      name="skill"
                      onClick={() => toggleSkill("C/C++")}
                    />{" "}
                    C/C++
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"javascript"}
                      name="skill"
                      onClick={() => toggleSkill("javascript")}
                    />{" "}
                    Javascript
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"typescript"}
                      name="skill"
                      onClick={() => toggleSkill("typescript")}
                    />{" "}
                    Typescript
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"express"}
                      name="skill"
                      onClick={() => toggleSkill("express")}
                    />{" "}
                    Express JS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"nodejs"}
                      name="skill"
                      onClick={() => toggleSkill("nodejs")}
                    />{" "}
                    Node JS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"ruby"}
                      name="skill"
                      onClick={() => toggleSkill("ruby")}
                    />{" "}
                    Ruby
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"php"}
                      name="skill"
                      onClick={() => toggleSkill("php")}
                    />{" "}
                    Php
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"laravel"}
                      name="skill"
                      onClick={() => toggleSkill("laravel")}
                    />{" "}
                    Laravel
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"python"}
                      name="skill"
                      onClick={() => toggleSkill("python")}
                    />{" "}
                    Python
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"django"}
                      name="skill"
                      onClick={() => toggleSkill("django")}
                    />{" "}
                    Django
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"flask"}
                      name="skill"
                      onClick={() => toggleSkill("flask")}
                    />{" "}
                    Flask
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"scala"}
                      name="skill"
                      onClick={() => toggleSkill("scala")}
                    />{" "}
                    Scala
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={".net"}
                      name="skill"
                      onClick={() => toggleSkill(".net")}
                    />{" "}
                    .Net
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"angular"}
                      name="skill"
                      onClick={() => toggleSkill("angular")}
                    />{" "}
                    Angular
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"react js"}
                      name="skill"
                      onClick={() => toggleSkill("react js")}
                    />{" "}
                    React JS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"vue"}
                      name="skill"
                      onClick={() => toggleSkill("vue")}
                    />{" "}
                    Vue
                  </label>
                </div>
              </div>
              <div className="skills-division-with-title">
                <p>Other Web Technologies</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"html"}
                      name="skill"
                      onClick={() => toggleSkill("html")}
                    />{" "}
                    HTML
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"css"}
                      name="skill"
                      onClick={() => toggleSkill("css")}
                    />{" "}
                    CSS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"sass"}
                      name="skill"
                      onClick={() => toggleSkill("sass")}
                    />{" "}
                    SASS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"tailwind"}
                      name="skill"
                      onClick={() => toggleSkill("tailwind")}
                    />{" "}
                    Tailwind
                  </label>
                </div>
              </div>

              <div className="skills-division-with-title">
                <p>Database Tech</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"mysql"}
                      name="skill"
                      onClick={() => toggleSkill("mysql")}
                    />{" "}
                    Mysql
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"postgres"}
                      name="skill"
                      onClick={() => toggleSkill("postgres")}
                    />{" "}
                    Postgres
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"sqlite"}
                      name="skill"
                      onClick={() => toggleSkill("sqlite")}
                    />{" "}
                    Sqlite
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"mongo db"}
                      name="skill"
                      onClick={() => toggleSkill("mongo db")}
                    />{" "}
                    Mongo DB
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"cassandra"}
                      name="skill"
                      onClick={() => toggleSkill("cassandra")}
                    />{" "}
                    Cassandra
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"redis"}
                      name="skill"
                      onClick={() => toggleSkill("redis")}
                    />{" "}
                    Redis
                  </label>
                </div>
              </div>
              <div className="skills-division-with-title">
                <p>Cloud Service Providers</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"AWS"}
                      name="skill"
                      onClick={() => toggleSkill("AWS")}
                    />{" "}
                    AWS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"firebase"}
                      name="skill"
                      onClick={() => toggleSkill("firebase")}
                    />{" "}
                    Firebase
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"azure"}
                      name="skill"
                      onClick={() => toggleSkill("azure")}
                    />{" "}
                    Microsoft (Azure)
                  </label>
                </div>
              </div>
              <div className="skills-division-with-title">
                <p>DevOps</p>
                <div className="skills-division">
                  <label>
                    <input
                      type="checkbox"
                      value={"docker"}
                      name="skill"
                      onChange={() => toggleSkill("docker")}
                    />{" "}
                    Docker
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"kubernetes"}
                      name="skill"
                      onChange={() => toggleSkill("kubernetes")}
                    />{" "}
                    Kubernetes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={"github"}
                      name="skill"
                      onChange={() => toggleSkill("github")}
                    />{" "}
                    Github
                  </label>
                </div>
              </div>
            </div>

            <small id="smallSkills"></small>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">City</label>
            <input
              type="text"
              id="job_city"
              className="element-input"
              value={city}
              onInput={(e) => setCity(e.target.value)}
            ></input>
            <small id="smallCity"></small>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Country</label>
            <input
              type="text"
              id="job_country"
              className="element-input"
              value={country}
              onInput={(e) => setCountry(e.target.value)}
            ></input>
            <small id="smallCountry"></small>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Level</label>

            <div className="addJobContainer__form__element__level">
              <div className="elem">
                <input
                  type="checkbox"
                  id="internship"
                  name="job_level"
                  value="Internship"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                />
                <label htmlFor="internship" className="label_for_input">
                  Internship
                </label>
                <br></br>
              </div>
              <div className="elem">
                <input
                  type="checkbox"
                  id="junior"
                  name="job_level"
                  value="Junior"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                />
                <label htmlFor="junior" className="label_for_input">
                  Junior
                </label>
                <br></br>
              </div>
              <div className="elem">
                <input
                  type="checkbox"
                  id="midSen"
                  name="job_level"
                  value="Mid/Senior"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                />
                <label htmlFor="midSen" className="label_for_input">
                  Mid/Senior
                </label>
                <br></br>
              </div>
              <div className="elem">
                <input
                  type="checkbox"
                  id="associate"
                  name="job_level"
                  value="Associate"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                />
                <label htmlFor="associate" className="label_for_input">
                  Associate
                </label>
                <br></br>
              </div>
              <div className="elem">
                <input
                  type="checkbox"
                  id="director"
                  name="job_level"
                  value="Director"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                />
                <label htmlFor="director" className="label_for_input">
                  Director
                </label>
                <br></br>
              </div>
            </div>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Work Time</label>
            <div className="addJobContainer__form__element__workTime">
              <div className="elem">
                <input
                  type="checkbox"
                  id="partTimeJob"
                  name="job_work_time"
                  value="Part Time"
                  onChange={(e) => {
                    setWorkTime(e.target.value);
                  }}
                />
                <label htmlFor="partTimeJob" className="label_for_input">
                  Part Time
                </label>
                <br></br>
              </div>

              <div className="elem">
                <input
                  type="checkbox"
                  id="FullTimeJob"
                  name="job_work_time"
                  value="Full Time"
                  onChange={(e) => {
                    setWorkTime(e.target.value);
                  }}
                />
                <label htmlFor="FullTimeJob" className="label_for_input">
                  Full Time
                </label>
                <br></br>
              </div>
            </div>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Work Type</label>
            <div className="addJobContainer__form__element__workTime">
              <div className="elem">
                <input
                  type="checkbox"
                  id="RemoteJob"
                  name="job_work_type"
                  value="Remote"
                  onChange={(e) => {
                    setWorkType(e.target.value);
                  }}
                />
                <label htmlFor="remoteJob" className="label_for_input">
                  Remote
                </label>
                <br></br>
              </div>
              <div className="elem">
                <input
                  type="checkbox"
                  id="OnSiteJob"
                  name="job_work_type"
                  value="OnSite"
                  onChange={(e) => {
                    setWorkType(e.target.value);
                  }}
                />
                <label htmlFor="OnSiteJob" className="label_for_input">
                  On-Site
                </label>
                <br></br>
              </div>
              <div className="elem">
                <input
                  type="checkbox"
                  id="HybridJob"
                  name="job_work_type"
                  value="Hybrid"
                  onChange={(e) => {
                    setWorkType(e.target.value);
                  }}
                />
                <label htmlFor="HybridJob" className="label_for_input">
                  Hybrid
                </label>
                <br></br>
              </div>
            </div>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Requirements</label>
            <textarea
              type="text"
              id="job_requirements"
              className="element-input"
              onChange={(e) => {
                setRequirements(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Description</label>
            <textarea
              type="text"
              id="job_description"
              className="element-input"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="addJobContainer__form__element">
            <label className="title_label">Responsibilities</label>
            <textarea
              type="text"
              id="job_responsibilities"
              className="element-input"
              onChange={(e) => {
                setResponsibilities(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <Button type="submit" id="btn-submitJob" onClick={handleAddJob}>
          Add Job
        </Button>
        {showMessage && <Message message={message} type={msgType} />}
      </div>
    </div>
  );
};

export default AddJob;
