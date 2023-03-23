import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import "./Message.css";

function Message({ message }) {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`ChatBubble ${message.uid === user.uid ? "right" : "left"}`}
    >
      <img className="UserAvatar" src={message.avatar} alt="UserAvatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        <p className="user-message">
          {message.createdAt !== null
            ? moment.unix(message.createdAt.seconds).format("hh:mm")
            : null}
        </p>
      </div>
    </div>
  );
}

export default Message;
