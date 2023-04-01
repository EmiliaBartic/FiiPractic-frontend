import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../../components/general/Navbar";
import Message from "../../components/general/Message";
import "../../App.css";

export default function ForgotPassword({ setIsRegister }) {
  const [emailUser, setEmailUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tokenFromUser, setTokenFromUser] = useState("");
  const [showFormResetPassword, setShowFormResetPassword] = useState(false);
  let tokenFromDatabase;
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleSubmitForgotPassword = () => {
    if (emailUser) {
      setShowFormResetPassword(true);
      axios
        .post(process.env.REACT_APP_BASE_URL+"/api/send-mail", {
          emailUser,
        })
        .then((response) => {
          console.log(response);
          setMessage("Email sent. Check your inbox :)");
          setMsgType("ok");
          setShowMessage(true);
        })
        .catch((error) => {
          setMessage(error);
          setMsgType("error");
          setShowMessage(true);
        });
    }
  };

  const handleSubmitUpdatePassword = () => {
    if (emailUser && tokenFromUser && newPassword) {
      //iau tokenul din tabel si vad daca e la fel
      axios
        .post(process.env.REACT_APP_BASE_URL+"/api/get-token", {
          emailUser,
        })
        .then((response) => {
          console.log(response);
          tokenFromDatabase = response.data[0].token;
          console.log("tokenFromDatabase: " + tokenFromDatabase);

          //daca fac match continui si schimb in bd parola
          if (tokenFromDatabase == tokenFromUser) {
            console.log("suntem egale");
            axios
              .post(process.env.REACT_APP_BASE_URL+"/api/updatePassword", {
                emailUser,
                newPassword,
              })
              .then((response) => {
                console.log(response);
                setMessage("Password updated");
                setMsgType("ok");
                setShowMessage(true);
              })
              .catch((error) => {
                setMessage(error);
                setMsgType("error");
                setShowMessage(true);
              });
          } else {
            console.log(tokenFromDatabase);
            console.log(tokenFromUser);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  if (!showFormResetPassword) {
    return (
      <div className="registerPage">
        <Navbar />
        <div
          className="register"
        >
          <h1 id="text">Send token to update password</h1>

          <div className="form-register">
            <Form.Group className="group" controlId="formBasicEmail">
              <Form.Label id="text">Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={handleSubmitForgotPassword}
              className="btn-submit"
            >
              Send email
            </Button>
          </div>
          <br></br>
          {showMessage && <Message message={message} type={msgType} />}

         
          <br></br>
        </div>
      </div>
    );
  } else {
    return (
      <div className="registerPage">
        <Navbar />
        <div className="register">
          <h1 id="text">Update password</h1>

          <div className="form-register">
            <Form.Group className="group" controlId="formBasicEmail">
              <Form.Label id="text">Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="group" controlId="formBasicEmail">
              <Form.Label id="text">Token from email</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTokenFromUser(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="group" controlId="formBasicEmail">
              <Form.Label id="text">New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              onClick={handleSubmitUpdatePassword}
              className="btn-submit"
            >
              Update password
            </Button>
            {showMessage && <Message message={message} type={msgType} />}
          </div>
        </div>
      </div>
    );
  }
}
