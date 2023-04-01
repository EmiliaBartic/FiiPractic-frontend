import React from "react";
import "../../styles/msg.scss";
const Message = ({ message, type }) => {
  //show message after form submission
  if (type === "error") {
    return (
      <div className="form-message-danger">
        <div className="form-message-danger__container">
          <p>{message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-message">
        <div className="form-message__container">
          <div>{message}</div>
        </div>
      </div>
    );
  }
};

export default Message;
