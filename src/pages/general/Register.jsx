import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/general/Navbar";
import registerPicture from "../../images/register-picture.png";
import "../../styles/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (email && password && name) {
      axios
        .post(process.env.REACT_APP_BASE_URL + "/api/auth/register", {
          email,
          password,
          name,
        })
        .then((response) => {
          localStorage.setItem("authToken", response.data.access_token);

          const config = {
            headers: { Authorization: `Bearer ${response.data.access_token}` },
          };

          axios
            .post(process.env.REACT_APP_BASE_URL + "/api/auth/me", {}, config)
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data));
              window.location.replace("/");
            });
        });
    }
  };
 
  return (
    <div className="registerPage">
      <Navbar />
      <div className="register">
       
        <h2 className="text-center">Register</h2>
        <div className="form-register">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label-register">Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label-register">Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label-register">Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit" onClick={handleRegister} className="submit-btn ">
            Submit
          </Button>
        </div>
        <br></br>
        <p className="text-xl">Already have an account? Log in instead</p>
        <Link to="/login" className="back-to-login-btn">
          Log in
        </Link>
      </div>
    </div>
  );
}
