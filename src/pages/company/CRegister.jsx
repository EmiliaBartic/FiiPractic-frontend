import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import companyRegister from "../../images/company-register.jpg";
import "../../styles/companyRegister.css";

export default function CRegister({ props }) {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAdress] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebsite, setCompanyWebSite] = useState("");
  const [password, setPassword] = useState("");

  const handleCompanyRegister = () => {
    console.log(
      companyName,
      password,
      companyEmail,
      companyAddress,
      companyCity,
      companyCountry,
      companyPhone,
      companyWebsite
    );
    if (
      companyName &&
      companyEmail &&
      companyAddress &&
      companyCity &&
      companyCountry &&
      companyPhone &&
      companyWebsite &&
      password
    ) {
      axios
        .post(process.env.REACT_APP_BASE_URL + "/api/auth/companyRegister", {
          companyName,
          email: companyEmail,
          companyAddress,
          companyCity,
          companyCountry,
          companyPhone,
          companyWebsite,
          password,
        })
        .then((response) => {
          localStorage.setItem("authToken", response.data.access_token);

          const config = {
            headers: { Authorization: `Bearer ${response.data.access_token}` },
          };

          axios
            .post(process.env.REACT_APP_BASE_URL + "/api/auth/me", {}, config)
            .then((response) => {
              console.log("/ME");
              console.log(response.data);
              localStorage.setItem("user", JSON.stringify(response.data));
              document.cookie =
                "isCompany=1; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
              // props.setCompany(response.data);
              // props.setAuth(true);
              window.location.replace("/");
            });
        });
    }
  };

  return (
    <div className="registerPage">
      <Navbar />
      <div className="register">
        <h2 className="text_c">Register company</h2>
        <div className="form-register">
          
            <Form.Group controlId="formBasicEmail" className="group">
              <Form.Label className="text">Company Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Company Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setCompanyEmail(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Company Address (Street)</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCompanyAdress(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Company City</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCompanyCity(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>
        
            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Company Country</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCompanyCountry(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Company Phone</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCompanyPhone(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Company Website</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCompanyWebSite(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail"  className="group">
              <Form.Label className="text">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{width:'30vw'}}
              />
            </Form.Group>
        </div>
        
        <Button type="submit" onClick={handleCompanyRegister} id="btn-submit">
          Submit
        </Button>

        <Link to="/login" className="back-to-login-btn">
          Back to Log in
        </Link>
      </div>
    </div>
  );
}
