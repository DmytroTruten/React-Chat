import React, { Fragment } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";
import "../styles/Message/Message.css";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <Fragment>
      <div className="MessageContainer d-flex">
        <p className="Message">{message.text}</p>
        <p className="MessageTime d-flex">
          {moment.unix(message.date.seconds).format("HH:mm")}
        </p>
        {console.log(message)}
      </div>
      {message.image && (
        <img className="MessageImage" src={message.image} alt="" />
      )}
    </Fragment>
  );
};

export default Message;
