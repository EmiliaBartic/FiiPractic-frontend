import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/general/Navbar";
import Message from "../../components/general/Message";
import loginPicture from "../../images/loginPicture.jpg";
import { CurrentUserContext } from "../../context/auth";
import "../../styles/login.css"
export default function LogIn() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

  const handleSubmit = () => {
    if (email && password) {
      // alert(`${email} and ${password}`);
      axios
        .post(process.env.REACT_APP_BASE_URL+"/api/auth/login", {
          email,
          password,
        })
        .then((response) => {
          localStorage.setItem("authToken", response.data.access_token);
          const config = {
            headers: { Authorization: `Bearer ${response.data.access_token}` },
          };
          //este companie sau user?
          let url = process.env.REACT_APP_BASE_URL+"/api/auth/isCompanyOrNot/";
          let result = url + email;

          axios.get(result).then((response) => {
            if (
              response.data !== undefined &&
              response.data !== null &&
              response.data[0].isCompany === 1
            ) {
              //console.log(response.data);
              document.cookie =
                "isCompany=1; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
            } else {
              //console.log("else", response.data);
              document.cookie =
                "isCompany=0; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
            }
          });
          axios
            .post(process.env.REACT_APP_BASE_URL+"/api/auth/me", {}, config)
            .then((response) => {
              // console.log(response.data);
              localStorage.setItem("user", JSON.stringify(response.data));
              setCurrentUser(response.data)
              // setUser(response.data);
              // setAuth(true);
              window.location.reload();
              window.location.replace("/")
            });
        })
        .catch((err) => {
          setMessage("Wrong email or password");
          setMsgType("error");
          setShowMessage(true);
        });
    }
  };

  return (
    <div className="registerPage">
      <Navbar />
      <div className="register">
        <h1 className="text">Log in</h1>
        {showMessage && <Message message={message} type={msgType} />}
        <div className="form-register">
          <Form.Group className="group" controlId="formBasicEmail">
            <Form.Label className="text">Email address</Form.Label>
            <Form.Control 
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="group" controlId="formBasicEmail">
            <Form.Label className="text">Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit" onClick={handleSubmit} className="submit-btn">
            Submit
          </Button>
        </div>

        <p className="text-xl font-bold mt-5" >Don't have an account? Register instead</p>
        <Link to="/register" className="back-to-login-btn">
          Register
        </Link>
        
        <p className="text-xl font-bold mt-5">Forgot your password?</p>
        <Link to="/forgot-password" className="back-to-login-btn">
          Reset Password
        </Link>
      
      </div>
    </div>
  );
}
