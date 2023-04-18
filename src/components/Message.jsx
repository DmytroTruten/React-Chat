import React, { Fragment, useRef, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import "../styles/Message/Message.css";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Fragment>
      <div
        ref={messageRef}
        className={`${
          message.image
            ? `ImageContainer ${
                message.text ? "WithCaption" : "WithoutCaption"
              } flex-column`
            : "MessageContainer"
        } ${
          message.senderID === currentUser.uid
            ? "current align-self-end"
            : "other align-self-start"
        } d-flex`}
      >
        {message.image && (
          <img className="MessageImage" src={message.image} alt="" />
        )}
        <div className="MessageTextContainer d-flex justify-content-between">
          {message.text && <p className="Message">{message.text}</p>}

          <p className="MessageTime d-flex">
            {moment.unix(message.date.seconds).format("HH:mm")}
          </p>
        </div>
        {console.log(message)}
      </div>
    </Fragment>
  );
};

export default Message;
