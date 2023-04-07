import React, { useState } from "react";
import NavbarLog from "../../components/user/Navbar-log";
import "../../styles/prepareInterview.css";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function PrepareInterview() {
  const [isHovering, setIsHovering] = useState(false);
  const [sentForm, setSentForm] = useState(false);
  const [skills, setSkills] = useState([]);
  const [idHovered, setIdHovered] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(new Map());
  const [testResult, setTestResult] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  const toggleAnswers = (option, q_id) => {
    setAnswers(new Map(answers.set(q_id, option)));
  };

  const toggleSkill = (skill) => {
    if (skills.includes(skill))
      setSkills(skills.filter((item) => item != skill));
    else setSkills([...skills, skill]);
  };

  const toggleShow = (id) => {
    setIsHovering(!isHovering);
    if (isHovering) setIdHovered(-1);
    else setIdHovered(id);
  };

  const submitTest = () => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (questions.length != answers.size) alert("Complete all the questions!");
    else if (answers) {
      let answerss = JSON.stringify([...answers]);
      let length_q = questions.length;
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/api/skills/test_result",
          { questions_length: length_q, answers: answerss },
          config
        )
        .then((response) => {
          console.log("ts: ", response.data);
          setTestResult(response.data.score);
          setWrongQuestions(response.data.wrongQuestions);
          console.log(wrongQuestions);
        });
    }
  };

  const handleSubmitSelection = () => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (skills) {
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "/api/skills/generate_test",
          { options: skills },
          config
        )
        .then((response) => {
          setQuestions(response.data.questions);
          setSentForm(true);
        })
        .catch((error) => {
          console.log(error);
          alert("An error occured");
        });
    } else {
      alert("Select skills!");
    }
  };

  if (sentForm == true) {
    return (
      <div>
        <NavbarLog />
        <h5 className="flex flex-row justify-center items-center m-auto mt-3">
          Prepare for interview!
        </h5>
        <div className="questions">
          {questions &&
            questions !== null &&
            questions.length > 0 &&
            questions.map((q, i) => (
              <div key={i} className="question">
                <h5 key={q.id}>
                  {" "}
                  {i + 1}. {q.question}
                </h5>

                <div className="options">
                  <div className="option">
                    <input
                      type="radio"
                      name={q.id}
                      onChange={(e) => {
                        toggleAnswers("a", q.id);
                      }}
                    ></input>
                    <label>{q.option_a}</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      name={q.id}
                      onChange={(e) => {
                        toggleAnswers("b", q.id);
                      }}
                    ></input>
                    <label>{q.option_b}</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      name={q.id}
                      onChange={(e) => {
                        toggleAnswers("c", q.id);
                      }}
                    ></input>
                    <label>{q.option_c}</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      name={q.id}
                      onChange={(e) => {
                        toggleAnswers("d", q.id);
                      }}
                    ></input>
                    <label>{q.option_d}</label>
                  </div>
                </div>
                <Button
                  variant="info"
                  className="m-3"
                  onClick={() => toggleShow(q.id)}
                >
                  Details
                </Button>

                {isHovering && q.id === idHovered && (
                  <div>
                    <h6>{q.explanation}</h6>
                  </div>
                )}
              </div>
            ))}
          <Button
            className="flex flex-row justify-center align-center m-auto w-1/3 mb-5"
            onClick={(e) => submitTest()}
          >
            Submit
          </Button>
          {testResult != 0 && (
            <>
              <h3 className="flex flex-row justify-center align-center m-auto w-1/3 mb-5">
                Your test result is: {testResult} / 100
              </h3>
              <br></br>
              <h3 className="flex flex-row justify-center align-center m-auto w-1/3 mb-5">You may revise your answer to these questions: </h3>
              {
                wrongQuestions && wrongQuestions.length>0 &&
                wrongQuestions.map((q,i)=>{
                  return (
                    <p className="flex flex-row justify-start align-center m-auto w-1/3 mb-5" key={i}>
                      {q}
                    </p>
                  );
                })
              }
            </>
          )}
        </div>
      </div>
    );
  } else if (sentForm == false) {
    return (
      <div>
        <NavbarLog />
        <h5 className="flex flex-row justify-center items-center m-auto mt-3">
          Prepare for interview! First, select skills for your test!
        </h5>
        <div className="select-skills-with-title">
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
          <Button
            variant="success"
            id="btn-submit-select-skills"
            onClick={() => handleSubmitSelection()}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
