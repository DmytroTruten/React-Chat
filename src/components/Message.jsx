import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import "../styles/Message/Message.css";

const Message = ({ message }) => {
  return (
    <div className="MessageContainer d-flex">
      <p className="Message">Message Example</p>
      <p className="MessageTime d-flex">12:34</p>
    </div>
  );
};

export default Message;
