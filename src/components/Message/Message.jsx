import React, { Fragment } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import "./Message.css";

function Message({ message }) {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`UserMessageContainer ${
        message.uid === user.uid ? "right" : "left"
      }`}
    >
      <div className="ChatBubble">
        <div className="UserMessage">
          <p className="UserName">{message.name}</p>
          <p className="UserMessage">{message.text}</p>
          <p className="UserMessageDatetime">
            {message.createdAt !== null
              ? moment.unix(message.createdAt.seconds).format("HH:mm")
              : null}
          </p>
        </div>
      </div>
      <div className="UserAvatarContainer">
        <img
          className={`UserAvatar ${
            message.uid === user.uid ? "current" : ""
          }`}
          src={message.avatar}
          alt="UserAvatar"
        />
      </div>
    </div>
  );
}

export default Message;
